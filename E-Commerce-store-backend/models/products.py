from db import conn, cursor

class Products:

    TABLE_NAME = "products"

    def __init__(self, name, price, quantity, image):
        self.id = None
        self.name = name
        self.price = price
        self.quantity = quantity
        self.image = image

    def save(self):
        if not all([self.name, self.price, self.quantity, self.image]):
            raise ValueError("All fields are required")
        
        try:
            price = float(self.price)
            quantity = int(self.quantity)
            if price <= 0 or quantity <= 0:
                raise ValueError("Price and quantity must be positive numbers")
        except ValueError:
            raise ValueError("Price and quantity must be numeric values")

        sql = f"""
        INSERT INTO {self.TABLE_NAME} (name, price, quantity, image)
        VALUES (?, ?, ?, ?)
        """
        cursor.execute(sql, (self.name, self.price, self.quantity, self.image))
        conn.commit()
        self.id = cursor.lastrowid

        return self.to_dict()

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "quantity": self.quantity,
            "image": self.image
        }

    @classmethod
    def find_one(cls , id):
        sql = f"""SELECT * FROM {cls.TABLE_NAME} WHERE id = ?"""
        cursor.execute(sql, (id,))
        row = cursor.fetchone()
        return cls.row_to_instance(row)


    @classmethod
    def get_all(cls):
        sql = f"""SELECT * FROM {cls.TABLE_NAME}"""
        rows = cursor.execute(sql).fetchall()
        return [cls.row_to_instance(row) for row in rows]

    @classmethod
    def row_to_instance(cls, row):
        if row is None:
            return None
        id, name, price, quantity, image = row
        product = cls(name, price, quantity, image)
        product.id = id
        return product

    @classmethod
    def create_table(cls):
        sql = f"""
        CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME} (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        quantity INTEGER NOT NULL,
        image TEXT NOT NULL
        )
        """
        cursor.execute(sql)
        conn.commit()
        print("Catalogue table created successfully")

    @classmethod
    def alter_table(cls):
        sql = f"""
        PRAGMA foreign_keys=off;
        BEGIN TRANSACTION;
        ALTER TABLE {cls.TABLE_NAME} RENAME TO {cls.TABLE_NAME}_old;
        CREATE TABLE {cls.TABLE_NAME} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            price REAL NOT NULL,
            quantity INTEGER NOT NULL,
            image VARCHAR NOT NULL
        );
        INSERT INTO {cls.TABLE_NAME} SELECT * FROM {cls.TABLE_NAME}_old;
        DROP TABLE {cls.TABLE_NAME}_old;
        COMMIT;
        PRAGMA foreign_keys=on;
        """
        cursor.executescript(sql)
        conn.commit()
        print("Table altered successfully")

    @classmethod
    def delete_table(cls):
        sql = f"""
        DROP TABLE IF EXISTS {cls.TABLE_NAME}
        """
        cursor.execute(sql)
        conn.commit()
        print("Catalogue table deleted successfully")
        

    def search_by_name(cls, search_query):
        sql = f"SELECT * FROM {cls.TABLE_NAME} WHERE name LIKE ?"
        rows = cursor.execute(sql, (f"%{search_query}%",)).fetchall()
        return [cls.row_to_instance(row) for row in rows]    


Products.create_table()

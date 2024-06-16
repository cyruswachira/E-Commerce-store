from db import conn, cursor

class User:
    TABLE_NAME = "users"

    def __init__(self, name, email, phone, location):
        self.id = None
        self.name = name
        self.email = email
        self.phone = phone
        self.location = location

    def save(self):
        sql = f"""INSERT INTO {self.TABLE_NAME} (name, email, phone, location) VALUES (?, ?, ?, ?)"""
        cursor.execute(sql, (self.name, self.email, self.phone, self.location))
        conn.commit()
        self.id = cursor.lastrowid
        return self.id

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "phone": self.phone,
            "location": self.location
        }

    @classmethod
    def find_one_by_phone(cls, phone):
        sql = f"SELECT * FROM {cls.TABLE_NAME} WHERE phone = ?"
        row = cursor.execute(sql, (phone,)).fetchone()
        return cls.row_to_instance(row)

    @classmethod
    def row_to_instance(cls, row):
        if row is None:
            return None
        user = cls(row[1], row[2], row[3], row[4])
        user.id = row[0]
        return user

    @classmethod
    def create_table(cls):
        sql = f"""
        CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            phone TEXT NOT NULL UNIQUE,
            location TEXT
        )
        """
        cursor.execute(sql)
        conn.commit()

User.create_table()



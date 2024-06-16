from db import conn, cursor

class Orders:
    TABLE_NAME = "orders"

    def __init__(self, product_id, user_id):
        self.id = None
        self.product_id = product_id
        self.user_id = user_id

    def save(self):
        sql = f"INSERT INTO {self.TABLE_NAME} (product_id, user_id) VALUES (?, ?)"
        cursor.execute(sql, (self.product_id, self.user_id))
        conn.commit()
        self.id = cursor.lastrowid
        return self.id

    @classmethod
    def create_table(cls):
        sql = f"""
        CREATE TABLE IF NOT EXISTS {cls.TABLE_NAME} (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            product_id INTEGER NOT NULL REFERENCES products(id),
            user_id INTEGER NOT NULL REFERENCES users(id)
        )
        """
        cursor.execute(sql)
        conn.commit()

Orders.create_table()

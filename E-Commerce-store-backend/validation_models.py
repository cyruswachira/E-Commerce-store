from pydantic import BaseModel
from typing import List

class ProductsModel(BaseModel):
    name:str
    price:float
    quantity:int
    image:str

class OrderItemModel(BaseModel):
    product_id: int
    quantity: int

class UserModel(BaseModel):
    name: str
    phone: str
    location: str
    email: str

class OrdersModel(BaseModel):
    orderDetails: List[OrderItemModel]
    userDetails: UserModel
    
from fastapi import FastAPI, HTTPException ,Query
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, ValidationError
from typing import List
from models.products import Products
from models.user import User
from models.orders import Orders
from validation_models import OrdersModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

class ProductCreateModel(BaseModel):
    name: str
    price: float
    quantity: int
    image: str

class ProductResponseModel(BaseModel):
    id: int
    name: str
    price: float
    quantity: int
    image: str

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/products", response_model=List[ProductResponseModel])
def get_products():
    products = Products.get_all()
    return [product.to_dict() for product in products]

@app.post("/products", response_model=ProductResponseModel)
def save_product(data: ProductCreateModel):
    try:
        product = Products(data.name, data.price, data.quantity, data.image)
        product.save()
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except ValidationError as e:
        raise HTTPException(status_code=422, detail=e.errors())
    except Exception as e:
        raise HTTPException(status_code=500, detail="Internal Server Error")
    return product.to_dict()

@app.post("/orders")
def create_order(data: OrdersModel):
    user_data = data.userDetails
    order_items = data.orderDetails
    
    user = User.find_one_by_phone(user_data.phone)
    if not user:
        user = User(name=user_data.name, email=user_data.email, phone=user_data.phone, location=user_data.location)
        user.save()
    
    for item in order_items:
        product = Products.find_one(item.product_id)
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with ID {item.product_id} not found")
        order = Orders(product_id=product.id, user_id=user.id)
        order.save()

@app.get("/products", response_model=List[ProductResponseModel])
def get_products(search: str = Query(None, description="Search query")):
    if search:
        products = Products.search(search)
     
    else:
        products = Products.get_all()

    return [product.to_dict() for product in products]   
    
    return {"message": "Order created successfully"}

    



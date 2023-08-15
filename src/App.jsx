import { useState } from "react";
import { AiOutlineClose } from 'react-icons/ai'

const App = () => {
  const products   = [
    {
      id: 1,
      photo: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MYMD2_AV3?wid=110&hei=110&fmt=jpeg&qlt=95&.v=1601053166000',
      name: "Beats Flex",
      description: "Flex all day",
      price: 99
    },
    {
      id: 2,
      photo: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MMTN2?wid=110&hei=110&fmt=jpeg&qlt=95&.v=1473703488187',
      name: 'EarPods',
      description: 'Unlike traditional, circular earbuds',
      price: 29.25
    },
    {
      id: 3,
      photo: 'https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/MK2H3?wid=110&hei=110&fmt=jpeg&qlt=95&.v=1634663497000',
      name: 'Beats Fit Pro',
      description: 'Beats Fit Pro is equipped with comfortable',
      price: 269
    }
  ];

  const [selectedProduct, setSelectedProduct] = useState([]);

  const handleAddToCart = (product) => {
    if (selectedProduct.some(item => item.id === product.id)) {
      setSelectedProduct((prev) => prev.map((each) => each.id === product.id ? { ...each, qty: each.qty + 1 } : each))
    } else {
      setSelectedProduct((prev) => [
        ...prev,
        {
          ...product,
          qty: 1
        }
      ])
    }
  }

  const handleDeleteItem = (product) => {
    setSelectedProduct((prev) => prev.filter(each => each.id !== product.id));
  }

  return (
    <>
      <div className="max-w-4xl mx-auto py-5">
        <h2 className="text-center text-[32px] font-bold">All Days Shop</h2>
      </div>
      <div className="max-w-4xl mx-auto grid grid-cols-2 mt-5">
        <div>
          <ProductList 
            productList={products}
            onAddToCart={handleAddToCart}
          />
        </div>
        <div>
          <h1 className=" text-center font-bold text-[23px] py-3">Shopping Cart</h1>
          <div className="grid grid-cols-3 text-[13px] py-2 px-2 border-b-[1px] border-t-[1px] border-gray-300">
            <div className="font-bold">Product Name</div>
            <div className="font-bold text-center">Quantity</div>
            <div className="font-bold text-right">Price</div>
          </div>
          {
            selectedProduct.length === 0 ? <NoItem /> : <Cart selectedProduct={selectedProduct} onDeleteItem={handleDeleteItem} />
          }
        </div>
      </div>
    </>
  );
}

export default App



function ProductList({ productList, onAddToCart }) {
  return (
    <>
      {productList.map((eachProduct) => (
        <Product
          key={eachProduct.id}
          product={eachProduct}
          onAddToCart={onAddToCart}
        />
      ))}
    </>
  );
}

function Product({ product, onAddToCart }) {
  return (
    <div className="flex space-x-4 py-3">
      <img src={product.photo} className="border-[1px] border-gray-400 rounded-md" />
      <div className="flex-row space-y-1">
        <h3 className="font-bold">{product.name}</h3>
        <p className="text-sm">{product.description}</p>
        <p className="text-sm">${product.price}</p>
        <button className="bg-blue-600 py-1 px-2 rounded-md text-white text-[11px]" onClick={() => onAddToCart(product)}>
          Add To Cart
        </button>
      </div>
    </div>
  )
}

function NoItem() {
  return (
    <div className="text-[13px] py-2 px-2 border-b-[1px] border-gray-300 text-center">
      No Items in shopping cart!
    </div>
  );
}

function Cart({ selectedProduct, onDeleteItem }) {
  const totalPrice  = selectedProduct.reduce((acc, cur) => acc + (cur.qty * cur.price), 0);

  return (
    <>
      {selectedProduct.map((product) => (
        <CartItems
          key={product.id}
          product={product}
          onDeleteItem={onDeleteItem}
        />
      ))}
      
      <CartTotal
        totalPrice={totalPrice}
      />
    </>
  )
}

function CartItems({ product, onDeleteItem }) {
  const price   = product.qty * product.price;

  return (
    <>
      <div className="grid grid-cols-3 text-[13px] py-2 px-2 border-b-[1px] border-gray-300">
        <div className="w-[100%] text-left flex">
          <AiOutlineClose size={20} onClick={() => onDeleteItem(product)} className="cursor-pointer text-red-600" />
          {product.name}
        </div>
        <div className="text-center">{product.qty} qty</div>
        <div className="text-right">
          ${price}
        </div>
      </div>
    </>
  );
}

function CartTotal({ totalPrice }) {
  return (
    <div className="grid grid-cols-2 py-2 px-2 text-[20px]">
      <div className="font-bold text-center">Total</div>
      <div className="font-bold text-right">${totalPrice}</div>
    </div>
  );
}
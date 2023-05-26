import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { userRequest } from "../requestMethods";

const Success = () => {
  const { state } = useLocation();
  const data = state && state.stripeData;
  const cart = state && state.cart;
  const currentUser = useSelector((state)  => {console.log(state.user.currentUser)
                                              return state.user.currentUser});
  const [orderId, setOrderId] = useState(null);
  const [randomString, setRandomString] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const createOrder = async function () {
      try {
        console.log(cart.products)
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => {
            return {
              productId: item._id,
              quantity: item._quantity
            };
          }),
          amount: cart.total,
          address: data.billing_details.address,
        });

        console.log(res);
        setOrderId(res.data._id);
        if (res.data._id) {
          setRandomString(generateRandomString());
        }
      } catch (error) {
        console.error("Error creating order:", error);
      }
    };

    const generateRandomString = () => {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
      let result = '';
      for (let i = 0; i < 16; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        result += characters.charAt(randomIndex);
      }
      return result;
    };

    // Check if redirected from elsewhere, otherwise redirect to homepage
    // if (!data) {
    //   navigate("/");
    // } else {
    //   createOrder(); // Call the createOrder function
    // }
    // await createOrder();
  }, [cart, data, currentUser, orderId, navigate]);

  const handleGoToHomepage = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId ? (
        <>
          <p>Order has been created successfully. Your order number is {orderId}</p>
          {randomString && <p>Random String: {randomString}</p>}
        </>
      ) : (
        <p>Uh, Not Quite! Something went wrong.</p>
      )}
      <button
        style={{ padding: 10, marginTop: 20, cursor: "pointer" }}
        onClick={handleGoToHomepage}
      >
        Go to Homepage
      </button>
    </div>
  );
};

export default Success;

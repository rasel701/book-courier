import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { FaCheckCircle } from "react-icons/fa";
const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  console.log(sessionId);

  useEffect(() => {
    if (sessionId) {
      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
        });
    }
  }, [sessionId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl p-8 max-w-md w-full text-center animate-fade-in">
        <FaCheckCircle className="mx-auto text-green-500 w-20 h-20 mb-4" />

        <h2 className="text-2xl font-bold text-green-600 mb-2">
          Payment Successful!
        </h2>

        <p className="text-gray-500 mb-6">
          Thank you for your purchase. Your payment has been successfully
          processed.
        </p>

        <div className="flex gap-3 justify-center">
          <Link to="/dashboard/my-orders" className="btn btn-success">
            View Orders
          </Link>
          <Link to="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;

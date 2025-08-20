import { useQuery } from "@tanstack/react-query";
import { getPayments } from "../serveces/paymentService";

const Payments = () => {
  const { data: paymentsData = [], isLoading } = useQuery({
    queryKey: ["payments"],
    queryFn: getPayments,
  });

  if (isLoading) return <div>Loading...</div>;

  const payments = paymentsData;

  return (
    <div className="bg-gray-900 min-h-screen p-6 text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Wallet</h1>
        <button className="bg-purple-600 px-4 py-2 rounded-lg shadow-lg hover:bg-purple-700">
          Generate Report
        </button>
      </div>

      <div className="bg-purple-700 p-6 rounded-2xl mb-6 shadow-lg">
        <h2 className="text-lg">Main balance:</h2>
        <p className="text-3xl font-bold">$864,333.07</p>
        <p className="text-sm mt-2">Card Holder: John Doe</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg col-span-2">
          <h2 className="text-xl font-semibold mb-4">Payment History</h2>
          <div className="space-y-4">
            {payments.map((payment) => (
              <div
                key={payment._id}
                className="flex justify-between items-center bg-gray-700 p-4 rounded-xl"
              >
                <div>
                  <p className="font-semibold">
                    {payment.method} - ${payment.amount}
                  </p>
                  <p className="text-sm text-gray-400">
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    payment.status === "completed"
                      ? "bg-green-500"
                      : payment.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Invoices Sent</h2>
          <div className="space-y-4">
            {payments.slice(0, 5).map((payment) => (
              <div
                key={payment._id}
                className="flex justify-between items-center bg-gray-700 p-3 rounded-xl"
              >
                <div>
                  <p className="font-medium">{payment.method}</p>
                  <p className="text-sm text-gray-400">
                    {new Date(payment.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="text-lg font-bold">${payment.amount}</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 bg-gray-600 py-2 rounded-xl hover:bg-gray-500">
            See More
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payments;

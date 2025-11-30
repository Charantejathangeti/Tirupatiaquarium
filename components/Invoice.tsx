import React from 'react';
import { Order } from '../types';
import { X, Printer, Download } from 'lucide-react';
import { WHATSAPP_NUMBER, SHOP_DETAILS } from '../constants';

interface InvoiceProps {
  order: Order;
  onClose: () => void;
}

const Invoice: React.FC<InvoiceProps> = ({ order, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 print:p-0 print:bg-white print:static">
      <div className="bg-white w-full max-w-2xl rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh] print:shadow-none print:max-h-none print:w-full">
        
        {/* Header Toolbar - Hidden when printing */}
        <div className="bg-slate-800 text-white p-4 flex justify-between items-center print:hidden">
          <h2 className="text-lg font-semibold">Invoice Preview</h2>
          <div className="flex gap-2">
            <button 
              onClick={() => window.print()} 
              className="flex items-center gap-2 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 rounded text-sm transition-colors"
            >
              <Printer size={16} /> Print
            </button>
            <button 
              onClick={onClose} 
              className="p-1.5 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Invoice Content */}
        <div className="p-8 overflow-y-auto print:overflow-visible">
          {/* Invoice Header */}
          <div className="flex justify-between items-start mb-8 border-b pb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800">INVOICE</h1>
              <p className="text-slate-500 text-sm mt-1">Order ID: #{order.id.slice(0, 8).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <h2 className="text-xl font-bold text-cyan-800">{SHOP_DETAILS.name}</h2>
              <p className="text-sm text-slate-600">{SHOP_DETAILS.address}</p>
              <p className="text-sm text-slate-600">{SHOP_DETAILS.city} - {SHOP_DETAILS.pincode}</p>
              <p className="text-sm text-slate-600 font-bold">Ph: +{WHATSAPP_NUMBER}</p>
              <p className="text-sm text-slate-600 underline decoration-slate-300 underline-offset-2">{SHOP_DETAILS.email}</p>
            </div>
          </div>

          {/* Bill To & Date */}
          <div className="flex justify-between mb-8">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Bill To</p>
              <p className="font-semibold text-slate-800 text-lg">{order.customerName}</p>
              <p className="text-slate-600">{order.customerEmail}</p>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Date</p>
              <p className="font-semibold text-slate-800">{new Date(order.date).toLocaleDateString()}</p>
              <div className="mt-2 inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-bold uppercase">
                {order.status === 'pending' ? 'Unpaid' : 'Paid'}
              </div>
            </div>
          </div>

          {/* Table */}
          <table className="w-full mb-8">
            <thead>
              <tr className="bg-slate-50 border-y border-slate-200">
                <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">Item</th>
                <th className="text-left py-3 px-2 text-sm font-semibold text-slate-600">Unit Price</th>
                <th className="text-center py-3 px-2 text-sm font-semibold text-slate-600">Qty</th>
                <th className="text-right py-3 px-2 text-sm font-semibold text-slate-600">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {order.items.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-3 px-2 text-sm text-slate-800">
                    <span className="font-medium">{item.name}</span>
                    <span className="block text-xs text-slate-500">{item.scientificName}</span>
                  </td>
                  <td className="py-3 px-2 text-sm text-slate-600">₹{item.price.toFixed(2)}</td>
                  <td className="py-3 px-2 text-sm text-slate-600 text-center">{item.quantity}</td>
                  <td className="py-3 px-2 text-sm font-medium text-slate-800 text-right">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Totals */}
          <div className="flex justify-end border-t pt-6">
            <div className="w-1/2 md:w-1/3">
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-medium text-slate-800">₹{order.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-slate-600">Tax (0%)</span>
                <span className="font-medium text-slate-800">₹0.00</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 mt-2">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-lg font-bold text-cyan-600">₹{order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center text-xs text-slate-400">
            <p>Thank you for shopping with Tirupati Aquarium. For questions, please contact us via WhatsApp: +{WHATSAPP_NUMBER}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
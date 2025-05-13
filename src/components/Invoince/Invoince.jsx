import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { saveAs } from "file-saver";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "../../redux/slices/Dashboard/Order_Config/orderStatusSlice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// const InvoiceComponent = ({ id }) => {
//   const dispatch = useDispatch();
//   const {
//     allOrders,
//     loading: orderLoading,
//     error,
//   } = useSelector((state) => state.orderStatus);
//   const invoiceRef = useRef();

//   useEffect(() => {
//     dispatch(fetchOrders());
//   }, [dispatch]);

//   const filterData = allOrders.find((data) => data._id === id);

//   // Print handler
//   const handlePrint = useReactToPrint({
//     content: () => invoiceRef.current,
//     pageStyle: `
//       @page { size: auto; margin: 10mm; }
//       @media print {
//         body { -webkit-print-color-adjust: exact; }
//         img { max-width: 100% !important; height: auto !important; }
//         .page-break { page-break-after: always; }
//       }
//     `,
//   });

//   // PDF download handler with better image handling
//   const downloadPdf = async () => {
//     const input = invoiceRef.current;

//     // Create a deep clone of the invoice
//     const clone = input.cloneNode(true);

//     // Function to convert any color to RGB
//     const forceRGB = (colorValue) => {
//       if (!colorValue || colorValue === "transparent") return "transparent";
//       if (colorValue.includes("oklch")) return "#000000"; // Fallback
//       return colorValue;
//     };

//     // Process all elements in the clone
//     const allElements = clone.querySelectorAll("*");
//     allElements.forEach((el) => {
//       const computedStyle = window.getComputedStyle(el);

//       // List of style properties that might contain colors
//       const colorProperties = [
//         "color",
//         "backgroundColor",
//         "borderColor",
//         "borderTopColor",
//         "borderRightColor",
//         "borderBottomColor",
//         "borderLeftColor",
//         "outlineColor",
//         "textDecorationColor",
//         "columnRuleColor",
//       ];

//       colorProperties.forEach((prop) => {
//         const colorValue = computedStyle.getPropertyValue(prop);
//         if (colorValue.includes("oklch")) {
//           el.style[prop] = forceRGB(colorValue);
//         }
//       });
//     });

//     // Create a temporary container
//     const tempDiv = document.createElement("div");
//     tempDiv.appendChild(clone);
//     tempDiv.style.position = "absolute";
//     tempDiv.style.left = "-9999px";
//     document.body.appendChild(tempDiv);

//     try {
//       const canvas = await html2canvas(clone, {
//         scale: 2,
//         useCORS: true,
//         logging: true,
//         backgroundColor: "#ffffff",
//       });

//       const pdf = new jsPDF("p", "mm", "a4");
//       const imgData = canvas.toDataURL("image/png");
//       const imgWidth = 190;
//       const imgHeight = (canvas.height * imgWidth) / canvas.width;

//       pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
//       pdf.save(`invoice_${filterData.orderCode}.pdf`);
//     } finally {
//       document.body.removeChild(tempDiv);
//     }
//   };

//   if (!filterData) {
//     return <div>Loading...</div>;
//   }

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "long",
//       day: "numeric",
//     });
//   };

//   const calculateSubtotal = () => {
//     return filterData.products.reduce(
//       (total, item) => total + item.product.price * item.quantity,
//       0
//     );
//   };

//   return (
//     <div className="relative">
//       {/* Action Buttons */}
//       <div className="flex justify-end gap-2 mb-4">
//         <button
//           onClick={handlePrint}
//           className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm print:hidden"
//         >
//           Print Invoice
//         </button>
//         <button
//           onClick={downloadPdf}
//           className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm print:hidden"
//         >
//           Download PDF
//         </button>
//       </div>

//       {/* Invoice Container */}
//       <div
//         ref={invoiceRef}
//         className="bg-white border rounded shadow-lg max-w-full p-8 text-sm print:shadow-none print:border-0"
//         style={{ width: "210mm", minHeight: "297mm" }} // A4 dimensions
//       >
//         {/* Invoice Header */}
//         <div className="flex justify-between border-b pb-4 mb-6">
//           <div>
//             <h2 className="text-md font-semibold">
//               Order{" "}
//               <span className="text-blue-600 print:text-blue-800">
//                 #{filterData.orderCode}
//               </span>
//             </h2>
//             <p className="text-gray-600 text-xs">
//               Date: {formatDate(filterData.createdAt)}
//             </p>
//           </div>
//           <div className="text-right">
//             <h2 className="text-md font-semibold">Invoice</h2>
//             <p className="text-xs text-gray-600">
//               Status: {filterData.orderStatus}
//             </p>
//           </div>
//         </div>

//         {/* Billing and Shipping Info */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
//           <div>
//             <h3 className="font-semibold mb-1 text-sm">Billing Details</h3>
//             <p className="text-gray-800 text-sm break-words">
//               {filterData.billingDetail}
//             </p>
//           </div>
//           <div>
//             <h3 className="font-semibold mb-1 text-sm">Shipping Details</h3>
//             <p className="text-gray-800 text-sm break-words">
//               {filterData.shippingDetail}
//             </p>
//           </div>
//         </div>

//         {/* Order Items Table */}
//         <div className="mb-6">
//           <h3 className="font-semibold mb-2 text-sm">Order Items</h3>
//           <table className="min-w-full text-sm border-t border-b">
//             <thead>
//               <tr className="bg-gray-100 text-left text-xs print:bg-gray-200">
//                 <th className="py-2 px-3">Product</th>
//                 <th className="py-2 px-3">Price</th>
//                 <th className="py-2 px-3">Qty</th>
//                 <th className="py-2 px-3">Total</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filterData.products.map((item) => (
//                 <tr key={item._id} className="border-t">
//                   <td className="py-2 px-3">
//                     <div className="flex items-center">
//                       {item.product.thumbnail && (
//                         <img
//                           src={item.product.thumbnail}
//                           className="w-8 h-8 rounded mr-3 object-cover"
//                           alt={item.product.name}
//                           crossOrigin="anonymous" // For CORS
//                           onError={(e) => {
//                             e.target.style.display = "none"; // Hide if image fails to load
//                           }}
//                         />
//                       )}
//                       <div>
//                         <p className="text-gray-900 font-medium">
//                           {item.product.name}
//                         </p>
//                         <p className="text-xs text-gray-500">
//                           SKU: {item.product.skuCode}
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-2 px-3">
//                     ₹{item.product.price.toFixed(2)}
//                   </td>
//                   <td className="py-2 px-3">{item.quantity}</td>
//                   <td className="py-2 px-3">
//                     ₹{(item.product.price * item.quantity).toFixed(2)}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Totals Section */}
//         <div className="flex justify-end mb-6">
//           <div className="w-full md:w-1/3 border-t pt-4 text-sm">
//             <div className="flex justify-between mb-2">
//               <span>Subtotal:</span>
//               <span>₹{calculateSubtotal().toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between mb-2">
//               <span>Shipping:</span>
//               <span>₹{filterData.shippingFees.toFixed(2)}</span>
//             </div>
//             <div className="flex justify-between font-bold text-base mt-3 print:text-black">
//               <span>Total:</span>
//               <span>₹{filterData.amount.toFixed(2)}</span>
//             </div>
//           </div>
//         </div>

//         {/* Payment Method */}
//         <div className="border-t pt-4 mb-4">
//           <h3 className="font-semibold text-sm mb-1">Payment Method</h3>
//           <p className="text-gray-700">{filterData.paymentMethod}</p>
//         </div>

//         {/* Footer */}
//         <div className="text-center text-xs text-gray-500 print:text-gray-700">
//           <p>Thank you for your order!</p>
//           <p>
//             If you have any questions, please contact us at support@example.com
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceComponent;

const InvoiceComponent = ({ id }) => {
  console.log(id);

  const dispatch = useDispatch();
  const {
    allOrders,
    loading: orderLoading,
    error,
  } = useSelector((state) => state.orderStatus);
  const invoiceRef = useRef();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const filterData = allOrders.find((data) => data._id === id);
  console.log(filterData);

  // Print handler
  const handlePrint = useReactToPrint({
    content: () => invoiceRef.current,
    pageStyle: `
      @page { size: auto; margin: 10mm; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        img { max-width: 100% !important; height: auto !important; }
        .page-break { page-break-after: always; }
      }
    `,
  });

  const downloadPdf = async () => {
    const input = invoiceRef.current;

    try {
      // Create a deep clone of the invoice
      const clone = input.cloneNode(true);

      // ✅ Add A4 size for PDF rendering only
      clone.style.width = "210mm";
      clone.style.minHeight = "297mm";
      clone.style.boxSizing = "border-box";
      clone.style.position = "relative";
      clone.style.overflow = "visible";
      clone.style.display = "block";

      // Simplify styling processing - only copy essential styles
      const processStyles = (originalElement, clonedElement) => {
        if (!originalElement || originalElement.nodeType !== 1) return;

        const essentialStyles = [
          "font-size",
          "font-family",
          "font-weight",
          "line-height",
          "color",
          "background-color",
          "border",
          "border-color",
          "padding",
          "margin",
          "width",
          "height",
          "min-height",
          "display",
          "position",
          "text-align",
          "vertical-align",
        ];

        const styles = window.getComputedStyle(originalElement);

        essentialStyles.forEach((prop) => {
          let value = styles.getPropertyValue(prop);
          // Replace oklch colors with simple alternatives
          if (value.includes("oklch")) {
            if (prop.includes("color") && !prop.includes("background")) {
              value = "#000000"; // Black for text
            } else if (prop.includes("background")) {
              value = "#ffffff"; // White for backgrounds
            } else if (prop.includes("border")) {
              value = "#cccccc"; // Light gray for borders
            }
          }
          clonedElement.style[prop] = value;
        });

        // Process children
        const originalChildren = originalElement.childNodes;
        const clonedChildren = clonedElement.childNodes;

        for (let i = 0; i < originalChildren.length; i++) {
          if (originalChildren[i].nodeType === 1 && clonedChildren[i]) {
            processStyles(originalChildren[i], clonedChildren[i]);
          }
        }
      };

      // Remove problematic classes
      const removeProblematicClasses = (element) => {
        if (element.classList) {
          element.classList.remove(
            "overflow-hidden",
            "overflow-x-hidden",
            "overflow-y-hidden"
          );
        }
        Array.from(element.children).forEach((child) => {
          removeProblematicClasses(child);
        });
      };

      // Process the clone
      removeProblematicClasses(clone);
      processStyles(input, clone);

      // Create a temporary container
      const tempDiv = document.createElement("div");
      tempDiv.appendChild(clone);
      tempDiv.style.position = "absolute";
      tempDiv.style.left = "-9999px";
      document.body.appendChild(tempDiv);

      // Generate canvas
      const canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        logging: true,
        backgroundColor: "#ffffff",
        allowTaint: true,
        letterRendering: true,
        onclone: (clonedDoc) => {
          const clonedElement = clonedDoc.body.querySelector(
            "[data-html2canvas-clone='true']"
          );
          if (clonedElement) {
            // Ensure all content is visible
            clonedElement.style.overflow = "visible";
            clonedElement.style.height = "auto";

            // Handle images
            const images = clonedElement.querySelectorAll("img");
            images.forEach((img) => {
              if (!img.complete || !img.naturalWidth) {
                img.style.display = "none";
                img.style.marginTop = "10px";
              }
            });
          }
        },
      });

      // Initialize PDF with proper dimensions
      const pdf = new jsPDF({
        orientation: "p",
        unit: "mm",
        format: "a4",
        putOnlyUsedFonts: true,
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 10; // mm margin on each side
      const imgWidth = pageWidth - 2 * margin;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add first page
      pdf.addImage(
        canvas,
        "PNG",
        margin,
        margin,
        imgWidth,
        imgHeight,
        undefined,
        "FAST"
      );

      // Add additional pages if content is taller than one page
      let heightLeft = imgHeight;
      let position = 0;
      let pageCount = 1;

      while (heightLeft >= pageHeight) {
        position = heightLeft - pageHeight;
        pdf.addPage();
        pdf.addImage(
          canvas,
          "PNG",
          margin,
          -(position - margin),
          imgWidth,
          imgHeight,
          undefined,
          "FAST"
        );
        heightLeft -= pageHeight;
        pageCount++;
      }

      // Save the PDF
      pdf.save(`invoice_${filterData.orderCode}.pdf`);
    } catch (error) {
      console.error("PDF generation error:", error);
      alert("There was an error generating the PDF. Please try again.");
    } finally {
      // Clean up temporary elements
      const tempDivs = document.querySelectorAll('div[style*="left: -9999px"]');
      tempDivs.forEach((div) => document.body.removeChild(div));
    }
  };

  if (!filterData) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateSubtotal = () => {
    return filterData.products.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0
    );
  };

  const calculateDiscount = () => {
    return filterData.products.reduce(
      (total, item) => total + item.discount * item.quantity,
      0
    );
  };

  console.log(filterData);

  return (
    <div className="relative">
      {/* Action Buttons */}
      <div className="flex justify-end gap-2 mb-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm print:hidden"
        >
          Print Invoice
        </button>
        <button
          onClick={downloadPdf}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm print:hidden"
        >
          Download PDF
        </button>
      </div>

      {/* Invoice Container */}
      <div
        ref={invoiceRef}
        className="bg-white border rounded shadow-lg max-w-full p-8 text-sm print:shadow-none print:border-0"
      >
        {/* Invoice Header */}
        <div className="flex justify-between border-b pb-4 mb-6">
          <div>
            <h2 className="text-md font-semibold">
              Order{" "}
              <span className="text-blue-600 print:text-blue-800">
                #{filterData.orderCode}
              </span>
            </h2>
            <p className="text-gray-600 text-xs">
              Date: {formatDate(filterData.createdAt)}
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-md font-semibold">Invoice</h2>
            <p className="text-xs text-gray-600">
              Status: {filterData.orderStatus}
            </p>
          </div>
        </div>

        {/* Billing and Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <h3 className="font-semibold mb-1 text-sm">Billing Details</h3>
            <p className="text-gray-800 text-sm break-words">
              {filterData.billingDetail}
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-1 text-sm">Shipping Details</h3>
            <p className="text-gray-800 text-sm break-words">
              {filterData.shippingDetail}
            </p>
          </div>
        </div>

        {/* Order Items Table */}
        <div className="mb-6">
          <h3 className="font-semibold mb-2 text-sm">Order Items</h3>
          <table className="min-w-full text-sm border-t border-b">
            <thead>
              <tr className="bg-gray-100 text-left text-xs print:bg-gray-200">
                <th className="py-2 px-3">Product</th>
                <th className="py-2 px-3">Price</th>
                <th className="py-2 px-3">Qty</th>
                <th className="py-2 px-3">Total</th>
              </tr>
            </thead>
            <tbody>
              {filterData.products.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="py-2 px-3">
                    <div className="flex items-center">
                      {item.product.thumbnail && (
                        <img
                          src={item.product.thumbnail}
                          className="w-8 h-8 rounded mr-3 object-cover"
                          alt={item.product.name}
                          crossOrigin="anonymous"
                          onError={(e) => {
                            e.target.style.display = "none";
                          }}
                        />
                      )}
                      <div>
                        <p className="text-gray-900 font-medium">
                          {item.product.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          SKU: {item.product.skuCode}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-2 px-3">
                    <span>₹{item.product.price.toFixed(2)}</span>
                  </td>
                  <td className="py-2 px-3">{item.quantity}</td>
                  <td className="py-2 px-3">
                    ₹
                    {(
                      item.product.price *
                      item.quantity
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals Section */}
        <div className="flex justify-end mb-6">
          <div className="w-full md:w-1/3 border-t pt-4 text-sm">
            <div className="flex justify-between mb-2">
              <span>Subtotal:</span>
              <span>₹{calculateSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping:</span>
              <span>₹{filterData.shippingFees.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Discount:</span>
              <span>-₹{filterData.discount ? (calculateSubtotal() - filterData.discount).toFixed(2) : (0).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-base mt-3 print:text-black">
              <span>Total:</span>
              <span>₹{filterData.amount.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="border-t pt-4 mb-4">
          <h3 className="font-semibold text-sm mb-1">Payment Method</h3>
          <p className="text-gray-700">{filterData.paymentMethod}</p>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-gray-500 print:text-gray-700">
          <p>Thank you for your order!</p>
          <p>
            If you have any questions, please contact us at support@example.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoiceComponent;

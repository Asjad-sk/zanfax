import Order from "@/app/models/order";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { error } from "console";

// API handler for cancelling a product in an order
export const PUT = async (req: NextRequest, { params }) => {
  try {
    const { id } = params; // Extract the product ID from the request URL
    console.log("Product ID received:", id);

    // Check if the product ID is a valid MongoDB ObjectID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("Invalid product ID:", id);
      return NextResponse.json({ error: "Invalid product ID" }, { status: 400 });
    }

    // Convert the string ID to an ObjectID
    const ObjectID = new mongoose.Types.ObjectId(id);
    console.log("Converted ObjectID:", ObjectID);

    // Find the order containing the product with the specific _id and where status is not 'cancelled'
    const updatedOrder = await Order.findOneAndUpdate(
      { 
        "products._id": ObjectID, // Match the specific product by its ObjectId
        // Optional: You can add any overall order checks here, if you want to ensure something specific about the order
      },
      { 
        $set: { "products.$.status": "cancelled" } // Update the matched product's status to 'cancelled'
      },
      { new: true } // Return the updated order document
    );

    // Log the result for debugging
    if (updatedOrder) {
      console.log("Updated Order:", updatedOrder);
    } else {
      console.error("Product not found or already cancelled.");
    }

    // If the product is not found or already cancelled, return an error
    if (!updatedOrder) {
      console.log(error)
      return NextResponse.json({ error: "Product not found or already cancelled" }, { status: 404 });
    }

    // Return the updated order with a success message
    return NextResponse.json({ message: "Product cancelled successfully", order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("Error cancelling product:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
};

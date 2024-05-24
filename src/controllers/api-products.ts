import { Request, Response } from "express";
import { prisma } from "../lib/prisma";

// Cria um produto
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, description, price, imageUrl, quantity } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price,
        imageUrl,
        quantity,
      },
    });
    return res.status(201).send({ message: "Product created successfully.", product: newProduct });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while creating product."
    });
  }
};

// Lista todos os produtos
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany();
    return res.status(200).send(products);
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while fetching products."
    });
  }
};

// Obtém um produto pelo ID
export const getProductById = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    if (!product) {
      return res.status(404).send({ message: "Product not found." });
    }
    return res.status(200).send({ data: product });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while fetching product."
    });
  }
};

// Atualiza um produto
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const { name, description, price, imageUrl, quantity } = req.body;
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        description,
        price,
        imageUrl,
        quantity,
      },
    });
    return res.status(200).send({ message: "Product updated successfully.", product: updatedProduct });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while updating product."
    });
  }
};

// Deleta um produto
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    return res.status(200).send({ message: "Product deleted successfully." });
  } catch (error) {
    return res.status(500).send({
      message: error instanceof Error ? error.message : "An unexpected error occurred while deleting product."
    });
  }
};

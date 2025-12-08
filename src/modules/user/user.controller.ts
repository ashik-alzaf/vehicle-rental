import { Request, Response } from "express";
import { userServices } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getUser();
    if (result.rowCount === 0) {
      res.status(200).json({
        success: true,
        message: "No Users found",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const singleUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.singleUser(req.params.userId as string);
    if (result.rowCount === 0) {
      res.status(200).json({
        success: true,
        message: "No User found",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const updateUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.updateUser(
      req.body,
      req.params.userId as string
    );
    if (result.rowCount === 0) {
      res.status(404).json({
        success: true,
        message: "No users found",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        data: result.rows,
      });
    }
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const deleteUser = async (req: Request, res: Response) => {
    try {
      const result = await userServices.deleteUser(
        req.params.userId as string
      );
      if (result.rowCount === 0) {
        res.status(404).json({
          success: true,
          message: "No User found",
          data: result.rows,
        });
      } else {
        res.status(200).json({
          success: true,
          message: "User Delete successfully",
          data: result.rows,
        });
      }
    } catch (err: any) {
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
};

export const userControllers = {
  getUser,
  singleUser,
  updateUser,
  deleteUser,
};

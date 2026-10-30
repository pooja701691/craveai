import Menu from "../models/Menu.js";

// GET all menu items

export const getAllMenuItems = async (req, res) => {
  try {

    const menu = await Menu.find().sort({
      createdAt: -1
    });

    return res.status(200).json({
      success: true,
      count: menu.length,
      menu
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// CREATE menu item

export const createMenuItem = async (req, res) => {
  try {

    const menuItem = await Menu.create(req.body);

    return res.status(201).json({
      success: true,
      menuItem
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// UPDATE menu item

export const updateMenuItem = async (req, res) => {
  try {

    const menuItem = await Menu.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    return res.status(200).json({
      success: true,
      menuItem
    });

  } catch (error) {

    return res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// DELETE menu item

export const deleteMenuItem = async (req, res) => {
  try {

    const menuItem = await Menu.findByIdAndDelete(
      req.params.id
    );

    if (!menuItem) {
      return res.status(404).json({
        success: false,
        message: "Menu item not found"
      });
    }

    return res.status(200).json({
      success: true,
      message: "Menu item deleted successfully"
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
export const WRONG_CREDETIALS_EXCEPTION = "Credentials provided are wrong";

export const DATABASE_CONNECTION_EXCEPTION =
  "Database connection couldn't be established";

export const OPERATION_FAILED = "Failed to process the requested operation";

export const USER_NOT_FOUND_EXCEPTION = "User was not found.";
export const USER_ALREADY_EXISTS_EXCEPTION = "User already exists.";

export const CATEGORY_NOT_FOUND_EXCEPTION = "Category was not found.";
export const CATEGORY_NOT_CREATED_EXCEPTION = "Category was not created.";
export const CATEGORY_ALREADY_EXISTS_EXCEPTION = "Category already exists.";
export const CATEGORY_NOT_REMOVED_EXCEPTION = "Category was not removed.";

export const SUBCATEGORY_NOT_FOUND_EXCEPTION = "Sub category not found.";
export const SUBCATEGORY_NOT_CREATED_EXCEPTION =
  "Sub category was not created.";
export const SUBCATEGORY_ALREADY_EXISTS_EXCEPTION =
  "Sub category already exists.";
export const SUBCATEGORY_NOT_REMOVED_EXCEPTION = "Subcategory was not removed.";

export const PROPERTY_NOT_FOUND_EXCEPTION = "Property not found";
export const PROPERTY_NOT_CREATED_EXCEPTION = "Property was not created.";
export const PROPERTY_ALREADY_EXISTS_EXCEPTION = "Property already exists";

export const CANNOT_ADD_IMAGE_TO_PROPERTY_EXCEPTION = "Cannot add web image to table images. Please provide a file instead.";

export const PRICE_QUANTITY_NOT_CREATED_EXCEPTION =
  "Price quantity was not created.";

export const BUDGET_NOT_FOUND = "Budget not found";

export const FILE_NOT_FOUND_EXCEPTION = "File not found";
export const FILE_NOT_REMOVED_EXCEPTION = "File was not removed.";

export const ONLY_IMAGE_ALLOWED_EXCEPTION = "Only image files are allowed!";

export const USER_NOT_AUTORIZED = "Unauthorized";

export const PRODUCT_NOT_FOUND_EXCEPTION = "Product was not found.";
export const PRODUCT_NOT_CREATED_EXCEPTION = "Product was not created.";
export const PRODUCT_ALREADY_EXISTS_EXCEPTION = "Product already exists.";
export const PRODUCT_NOT_REMOVED_EXCEPTION = "Product was not removed.";

export const INVALID_FIELD_EXCEPTION = (field) => {
  return field + " is invalid.";
};

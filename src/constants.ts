export const WRONGCREDETIALSEXCEPTION = "Credentials provided are wrong";

export const DATABASE_CONNECTION_EXCEPTION =
  "Database connection couldn't be established";

export const OPERATION_FAILED = "Failed to process the requested operation";

export const USERNOTFOUNDEXCEPTION = "User was not found.";
export const USERALREADYEXISTSEXCEPTION = "User already exists.";

export const CATEGORY_NOT_FOUND_EXCEPTION = "Category was not found.";
export const CATEGORYNOTCREATEDEXCEPTION = "Category was not created.";
export const CATEGORY_ALREADY_EXISTS_EXCEPTION = "Category already exists.";
export const CATEGORY_NOT_REMOVED_EXCEPTION = "Category was not removed.";

export const SUBCATEGORY_NOT_FOUND_EXCEPTION = "Sub category not found.";
export const SUBCATEGORYNOTCREATEDEXCEPTION = "Sub category was not created.";
export const SUBCATEGORY_ALREADY_EXISTS_EXCEPTION = "Sub category already exists.";

export const PROPERTYNOTFOUNDEXCEPTION = "Property not found";
export const PROPERTYNOTCREATEDEXCEPTION = "Property was not created.";
export const PROPERTYALREADYEXISTSEXCEPTION = "Property already exists";

export const PRICEQUANTITYNOTCREATEDEXCEPTION =
  "Price quantity was not created.";

export const BUDGETNOTFOUND = "Budget not found";

export const USER_NOT_AUTORIZED = "Unauthorized";

export const PRODUCTNOTFOUNDEXCEPTION = "Product was not found.";
export const PRODUCTNOTCREATEDEXCEPTION = "Product was not created.";
export const PRODUCTALREADYEXISTSEXCEPTION = "Product already exists.";

export const INVALIDFIELDEXCEPTION = (field) => {
  return field + " is invalid.";
};

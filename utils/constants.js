const MESSAGES = {
  SUCCESS_MESSAGE: "Success",
  UNSUCCESS_MESSAGE: "Not Successful",
  EMAIL_TAKEN: "Email is already taken",
  CREDENTIALS_NOT_VALID: "Credentials not valid",
  TOKEN_NOT_FOUND: "No user found with the token",
  TOKEN_NOT_VALID: "Token not valid",
  INTERNAL_ERROR: "There is some internal error with server",
  DATABASE_CONNECTION_SUCCESS: "Connection Has Been Established To DataBase:",
  DATABASE_CONNECTION_UNSUCCESS:
    "There is Some Error in Connecting to Database",
  NO_USER_FOUND: "No user found",
  NOT_IMPLEMENTED: "Not Implemented Yet",
  BRAND_TAKEN: "Brand name is already taken",
  BRAND_NOT_EXSIST: "Brand does not exsist",
  CATEGORY_NOT_EXSIST: "Category does not exsist",
  BRAND_REQUIRED: " Brand is required",
  ASSET_REQUIRED: " Asset required",
  CATEGORY_REQUIRED: " Category is required",
  SUBCATEGORY_REQUIRED: " Subcategory is required",
  PASSWORD_UPDATED_SUCCESSFUL: "Password updated successfully",
  GUEST_ALREADY_EXSIST: "Guest User already exsists",
  USER_REQUIRED: "User Id is required",
  NO_SUB_ADMIN_FOUND: "No sub admin found",
  GUEST_ADDED_SUCCESSFUL: "Guest added successfuly",
  SUB_ADMIN_ADDED_SUCCESSFUL: "Sub admin added successfuly",
  EMAIL_FOR_FORGET_PASSWORD_RESET: "Email for reseting password",
  EMAIL_UNSUCCESSFUL: "Email sending failed",
  EMAIL_SUCCESSFUL: "Email sending successful",
  OLD_PASSWORD_MATCH: "New Password cannot be same as previous password",
  LOBBY_CANNOT_HAVE_SAME_NAME: "Event can not have same name",
  LOBBY_ID_DOESNT_EXIST: "Lobby id does not exist.",
  CREATE_ADD_FAILED: "Cannot create Advertisement.slot doesnot exist ",
  LOBBY_DOESNT_HAS_SLOTS: "Slot doesnot exist for lobby ",
  SLOT_DOESNT_EXIST_FOR_LOBBY: "Lobby has no slot ",
  EITHER_FILE_OR_URL_IS_REQUIRED: "Either file or URL is required",
  ACCOUNT_BLOCKED: "Account Blocked by admin",
  EMAIL_NOT_FOUND: "Enter a valid email",
  IMAGE_CANNOT_BE_EMPTY: "Image field cannot be empty",
  COLLECTION_ADDRESS_IS_NOT_VALID: "Collection Address is not valid",

  EMAIL_CONTENT: function (email, token) {
    return `A password reset was requested for this email address ${email}.
    If you requested this reset, please 
    <a href="${process.env.FRONTEND_URL}/resetPassword?token=${token}">Reset Your Password</a>`
  },
  CATEGORY_TAKEN: "Category name is already taken",
  SUBCATEGORY_TAKEN: "SubCategory name is already taken",
  INVALID_BRAND: "Invalid brand name",
  INVALID_CATEGORY: "Invalid category name",
  INVALID_SUBCATEGORY: "Invalid Subcategory name",
  NFT_ALREADY_EXSIST: "NFT already exsists",
  NFT_NOT_EXSIST: "NFT does not exsist",
  SUBCATEGORY_NOT_EXSIST: "Subcategory does not exsist",
  IPFS_IMAGE_NOT_UPLOADED: "Error uploading images to IPFS",
  NFT_VISIBILE_SUCCESS_MESSAGE: " NFT is visible on market place",
  NFT_NOT_VISIBILE_SUCCESS_MESSAGE: " NFT is removed from market place",
  EVENT_ADDED_SUCCESSFULLY: "Event created successfully",
  EVENT_UPDATED_SUCCESSFULLY: "Event updated successfully",
  EVENT_ACTIVATED_SUCCESSFULLY: "Event activated successfully",
  EVENT_DEACTIVATED_SUCCESSFULLY: "Event deactivated successfully",
  EVENT_DELETED_SUCCESSFULLY: "Event deleted successfully",
  ADVERTISEMENT_ADDED_SUCCESSFULLY: "Advertisement added successfully",
  ADVERTISEMENT_DELETED_SUCCESSFULLY: "Advertisement deleted successfully",
  SCREEN_ACTIVATED_SUCCESSFULLY: "Screen Activated successfully",
  SCREEN_DEACTIVATED_SUCCESSFULLY: "Screen Deactivated successfully",
  BRAND_ADDED_SUCCESSFULLY: "Brand created successfully",
  BRAND_UPDATED_SUCCESSFULLY: "Brand updated successfully",
  BRAND_DELETED_SUCCESSFULLY: "Brand deleted successfully",
  CHOOSE_BRAND: "Choose Brand",
  CATEGORY_CREATED_SUCCESSFULLY: "Category created successfully",
  CATEGORY_UPDATED_SUCCESSFULLY: "Category updated successfully",
  CATEGORY_DELETED_SUCCESSFULLY: "Category deleted successfully",
  CHOOSE_CATEGORY: "Choose Category",
  SUBCATEGORY_CREATED_SUCCESSFULLY: "Subcategory created successfully",
  SUBCATEGORY_UPDATED_SUCCESSFULLY: "Subcategory updated successfully",
  SUBCATEGORY_DELETED_SUCCESSFULLY: "Subcategory deleted successfully",
  CHOOSE_SUBCATEGORY: "Choose Subcategory",
  NFT_COUNT_REACHED: "Maximum limit of NFT in subcategory reached",
  NFT_CREATED_SUCCESSFULLY: "NFT created successfully",
  NFT_DELETED_SUCCESSFULLY: "NFT deleted successfully",
  NFT_LAZY_MINTED_SUCCESSFULLY: "NFT lazy minted successfully",
  NFT_MINTED_SUCCESSFULLY: "NFT minted successfully"
}
const URL = {
  ADVERTISEMENT_URL: "/uploads/"
}

const MODELS = {
  ADMIN: "Admin",
  NFT_TOKEN: "NftToken",
  FORGET_PASSWORD_TOKEN: "ForgetPasswordToken",
  BRAND: "Brand",
  CATEGORY: "Category",
  SUBCATEGORY: "SubCategory",
  COLLECTION: "Collection",
  LOBBY: "Lobbie",
  NFT: "Nft",
  SLOT: "Slot",
  THEATER: "Theater",
  USER: "User"
}

const TABLES = {
  ADMIN: "Admins",
  NFT_TOKEN: "NftTokens",
  BRAND: "Brands",
  CATEGORY: "Categories",
  SUBCATEGORY: "SubCategories",
  COLLECTION: "Collections",
  LOBBY: "Lobbies",
  NFT: "Nfts",
  SLOT: "Slots",
  THEATER: "Theaters",
  USER: "Users",
  FORGET_PASSWORD_TOKEN: "ForgetPasswordTokens"
}

const LOBBY_SLOTS = (lobbyId) => {
  let slots = 20
  let slotsData = []
  for (let i = 1; i <= slots; i++) {
    slotsData.push({
      slotNumber: i,
      LobbieId: lobbyId,
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date()
    })
  }
  return slotsData
}

module.exports = {
  MESSAGES,
  TABLES,
  MODELS,
  URL,
  LOBBY_SLOTS
}

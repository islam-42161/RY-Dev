const conf = {
    appwriteUrl: String(process.env.EXPO_PUBLIC_APPWRITE_URL),
    appwriteProjectId: String(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID),
    appwriteCollectionId: String(process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID),
    appwriteBucketId: String(process.env.EXPO_PUBLIC_APPWRITE_BUCKET_ID),
}
export default conf
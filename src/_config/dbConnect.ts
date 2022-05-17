import mongoose from 'mongoose'

const mongooseConnector = async (
    mongodbUri: string,
    user: string,
    pass: string
) => {
    let connected = false;

    const databaseOptions = {
        useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
		authSource: "admin",
		user,
		pass,
    };

    while (!connected) {
        await mongoose 
            .connect(mongodbUri, databaseOptions)
            .then(() => {
                connected = true;
                console.log("Successfully connected to the database.\n\n");
            })
            .catch(() => {
                console.error("We have a problem connecting to the database, Retrying...");
            }); 
    }
    return mongoose.connection.readyState > 0;
}

/**
 * 
 */
export default async function connectToDatabase(): Promise<boolean> {
	const { DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME } = process.env;
    
	if (!DB_HOST || !DB_PORT || !DB_USER || !DB_PASS || !DB_NAME) {
		console.log(DB_HOST, DB_PORT, DB_USER, DB_PASS, DB_NAME);
		throw new Error(
			"You have not defined the database credentials correctly."
		);
	}

	const mongodbUri = `mongodb://${DB_HOST}:${DB_NAME}` || `${process.env.MONGO_KEY}`;

	console.log(
		`Connecting to the MongoDB database at: mongodb://${DB_HOST}:${DB_PORT}`
	);

	return await mongooseConnector(mongodbUri, DB_USER, DB_PASS);
}
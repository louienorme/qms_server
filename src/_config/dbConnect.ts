import mongoose from 'mongoose'

const mongooseConnector = async (
    mongodbUri: string
) => {
    let connected = false;

    const databaseOptions = {
        useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		authSource: "admin"
    };

    while (!connected) {
        await mongoose 
            .connect(mongodbUri, databaseOptions)
            .then(() => {
                connected = true;
                console.log("Successfully connected to the database.\n\n");
            })
            .catch((err) => {
				console.log(err);
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

	const mongodbUri = `${process.env.MONGO_KEY}`;

	console.log(
		`Connecting to the MongoDB database at: ${process.env.MONGO_KEY}`
	);

	return await mongooseConnector(mongodbUri);
}
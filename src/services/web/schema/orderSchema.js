import database from "../databaseConnect";

const OrderSchema = new database.Schema(
	{
		type: { type: String, enum: ['course', 'classroom'], required: true },
		parentslug: { type: String, required: true },
		slug: { type: String, required: true },
		userid: { type: String, required: true }
	},
	{ collection: 'completed' }
)

OrderSchema.index({ slug: 1, userid: 1 }, { unique: true })

const model = database.model('Completed', OrderSchema)
export default model
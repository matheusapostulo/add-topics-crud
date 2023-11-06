import mongoose, {Schema} from "mongoose";

const topicSchema = new Schema(
    {
        created: {
            type: String,
            required: true,
        }, 
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Topic = mongoose.models.Topic || mongoose.model("Topic", topicSchema)

export default Topic;
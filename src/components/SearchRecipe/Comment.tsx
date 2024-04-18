export interface CommentProps {

    comment: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    rating: string;
}

export interface Props {
    comment: CommentProps;
}

const Comment: React.FC<Props> = (props) => {
    const { comment } = props;

    const formatDate = (dateString: string | number | Date) => {
        return new Date(dateString).toISOString().split('T')[0];
    }


    return (
        <div className="bg-white border shadow-md font-bold bg-repeat m-2">
            <p>{comment.comment}</p>
            <p>Written by: {comment.name}</p>
            <p>{formatDate(comment.createdAt)}</p>
        </div>
    );
};


export default Comment; 
import React, { useEffect, useState } from 'react';
import axios, { } from 'axios';
import Comment, { CommentProps } from "./Comment.tsx";



interface RecipeRating {
    dishId: string;
    rating: number | null;
}

const RecipeRating: React.FC<RecipeRating> = ({ dishId, rating }) => {
    const [hoverRating, setHoverRating] = useState<number | null>(rating);
    const [comments, setComments] = useState<CommentProps[]>([]);
    const [newComment, setNewComment] = useState('');
    const [name, setName] = useState('');


    const addComment = () => {

        if (!newComment.trim() || !name.trim()) {
            console.log("You must enter both a name and a comment.");
            return;
        }

        axios.post(`https://sti-java-grupp2-afmbgd.reky.se/recipes/${dishId}/comments`, {
            comment: newComment,
            name: name,
        })
            .then((response) => {
                console.log('Comment saved successfully:', response.data);
                loadComments();
                setNewComment('');
                setName('');
            })
            .catch((error) => {
                console.error('Error saving comment:', error);
            });
    };

    const loadComments = () => {
        axios.get(`https://sti-java-grupp2-afmbgd.reky.se/recipes/${dishId}/comments`)
            .then((response) => {
                console.log('Loaded comments:', response.data);
                const sortedComments = response.data.sort((a: CommentProps, b: CommentProps) =>
                    new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                setComments(sortedComments);
            })
            .catch((error) => {
                console.error('Error loading comments:', error);
            });
    }

    const handleRatingChange = (newRating: number) => {
        console.log(`Rated dish ${dishId} with ${newRating} stars`);
        // setRating(newRating);

        axios.post(
            `https://sti-java-grupp2-afmbgd.reky.se/recipes/${dishId}/ratings`,
            {
                "rating": newRating
            }
        )
            .then((response) => {
                console.log('Rating saved successfully:', response.data);
                //if (response.data.success) {
                // setRating(newRating);
                // }
            })
            .catch((error) => {
                console.error('Error saving rating:', error);
            });
    };
    const handleMouseEnter = (value: number) => {
        setHoverRating(value);
    };
    const handleMouseLeave = () => {
        // setHoverRating(null);
    };
    const handleCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNewComment(event.target.value);
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmitComment = async () => {

        if (!newComment.trim() || !name.trim()) {
            console.log("Both name and comment must be provided.");
            return;
        }

        console.log(`Comment for dish ${dishId}: ${newComment}`);
        addComment();
    }

    useEffect(() => {
        loadComments();
    }, []);


    return (
        <div>
            <div>
                {[1, 2, 3, 4, 5].map((value) => (
                    <span
                        className='text-yellow-400'
                        key={value}
                        onClick={() => handleRatingChange(value)}
                        onMouseEnter={() => handleMouseEnter(value)}
                        onMouseLeave={handleMouseLeave}
                        style={{ cursor: 'pointer' }}
                    >
                        {value <= (hoverRating || 0) ? '★' : '☆'}
                    </span>
                ))}
            </div>
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg shadow">
                <input
                    className="w-1/2 p-2 text-sm text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                /><br /><br />
                <textarea
                    className="w-full p-2 text-sm text-gray-700 bg-white border rounded-lg focus:outline-none focus:border-green-500"
                    placeholder="Enter your comment here.."
                    value={newComment}
                    onChange={handleCommentChange}
                /><br />

            </div>
            <button onClick={handleSubmitComment}
                className="px-4 py-2 bg-green-600 text-white text-sm font-semibold rounded hover:bg-green-700"
            > Submit Comment
            </button>
            <div>
                {comments.map((commentItem) => (
                    <Comment comment={commentItem} />
                ))}
            </div>
        </div>
    );
};


export default RecipeRating;
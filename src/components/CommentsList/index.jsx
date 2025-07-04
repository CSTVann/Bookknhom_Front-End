import React from 'react';
import Image from 'next/image'; // If you are using Next.js, otherwise adjust accordingly
import "../../assets/style/comment_v2/style.css"

const CommentsList = ({ comments }) => {
    return (
        <div className="row list-cmt">
            <div id="list_comment" className="col-md-12 list-cmt-container" style={{ overflowY: 'scroll', maxHeight: '400px' }}>
                {comments.map((comment, index) => (
                    <div key={index} className="box_result row" style={{display: 'flex', alignItems: "center"}}>
                        <div className="avatar_comment col-md-1">
                            <Image className='user-image' width={50} height={50} src={comment.user_image ? comment.user_image : "https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"} alt="avatar" />
                        </div>
                        <div className="result_comment">
                            <div className="flex-row cmter">
                                <h4 className='cmter-name'>{comment.name}</h4>
                                <span className='cmter-at'>{new Date(comment.created_at).toLocaleString()}</span>
                            </div>
                            <p className='cmter-txt'>{comment.comment}</p>
                            <hr style={{width: "100vw"}}/>
                            <div className="child_replay"></div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentsList;

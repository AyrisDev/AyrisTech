import styles from './BlogDetailDiscussion.module.css';

const comments = [
    {
        author: 'Sam Reed',
        role: 'Full Stack Developer',
        date: '2 days ago',
        text: 'This is an incredible deep dive! I particularly found the PQC section very insightful for my current project.',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=2787&auto=format&fit=crop',
        replies: [
            {
                author: 'Elena Rodriguez',
                role: 'CTO @ QuantumSafe',
                date: '1 day ago',
                text: 'Glad you liked it, Sam! Hardware error correction is definitely the breakthrough of the year.',
                avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2861&auto=format&fit=crop',
            }
        ]
    },
    {
        author: 'Mark Sterling',
        role: 'Cybersecurity Analyst',
        date: '3 days ago',
        text: 'What are your thoughts on NIST’s recent announcements regarding Kyber and Dilithium?',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2940&auto=format&fit=crop',
        replies: []
    }
];

const BlogDetailDiscussion = () => {
    return (
        <section className={styles.discussion}>
            <div className={styles.container}>
                <h3 className={styles.title}>Discussion (31)</h3>

                <div className={styles.commentForm}>
                    <div className={styles.formAvatar}>J</div>
                    <div className={styles.formContent}>
                        <textarea
                            placeholder="What are your thoughts on this article?"
                            className={styles.textarea}
                        ></textarea>
                        <div className={styles.formActions}>
                            <button className={styles.submitBtn}>Post Comment</button>
                        </div>
                    </div>
                </div>

                <div className={styles.commentList}>
                    {comments.map((comment, idx) => (
                        <div key={idx} className={styles.commentRow}>
                            <div className={styles.commentAvatar} style={{ backgroundImage: `url(${comment.avatar})` }}></div>
                            <div className={styles.commentContent}>
                                <div className={styles.commentMeta}>
                                    <span className={styles.commentAuthor}>{comment.author}</span>
                                    <span className={styles.commentRole}>{comment.role}</span>
                                    <span className={styles.commentDate}>• {comment.date}</span>
                                </div>
                                <p className={styles.commentText}>{comment.text}</p>
                                <div className={styles.commentActions}>
                                    <button className={styles.actionBtn}>Reply</button>
                                    <button className={styles.actionBtn}>Like</button>
                                </div>

                                {comment.replies.length > 0 && (
                                    <div className={styles.replies}>
                                        {comment.replies.map((reply, rIdx) => (
                                            <div key={rIdx} className={styles.replyRow}>
                                                <div className={styles.commentAvatar} style={{ backgroundImage: `url(${reply.avatar})` }}></div>
                                                <div className={styles.commentContent}>
                                                    <div className={styles.commentMeta}>
                                                        <span className={styles.commentAuthor}>{reply.author}</span>
                                                        <span className={styles.commentRole}>{reply.role}</span>
                                                        <span className={styles.commentDate}>• {reply.date}</span>
                                                    </div>
                                                    <p className={styles.commentText}>{reply.text}</p>
                                                    <div className={styles.commentActions}>
                                                        <button className={styles.actionBtn}>Reply</button>
                                                        <button className={styles.actionBtn}>Like</button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BlogDetailDiscussion;

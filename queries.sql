CREATE TABLE book(
	id SERIAL PRIMARY KEY,
	photoUrl TEXT,
	reviewcontent TEXT,
	author VARCHAR(40),
	reviewdate DATE DEFAULT CURRENT_DATE,
	rating INT,
    title VARCHAR(100)
);

INSERT INTO book (photoUrl, reviewcontent, author, rating, title)
VALUES('https://covers.openlibrary.org/b/id/4544366-L.jpg',

        '"The Unfinished Nation" offers a concise, engaging overview of American history
        . Its balanced perspectives and rich narrative make complex events accessible. 
        The book updated content and inclusive approach ensure relevance for contemporary 
        readers, making it a valuable resource for students and history enthusiasts alike. 
        Highly recommended.',
        
        'Alan Brinskley',
        
        9,
        
        'THE UNFINISHED NATION');
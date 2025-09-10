Assignment 2 - Short Stack: Basic Two-tier Web Application using HTML/CSS/JS and Node.js  

===

## CS4241 Assignment 2 -- Drawing Ideas List
My project is a drawing idea list, where a user can submit, edit, and delete drawing ideas. The user can submit an idea, a reason for the drawing, and their desire to draw it. Once these are filled out, the user hits the submit button, their idea shows up in the results page, where a priority is generated based on their reason and desire. I used the CSS grid layout to divide the contents of my page.

## Technical Achievements
- **Single Page App**: The page takes a value that is typed in (idea), and two other dropdown options (reason and desire), and adds these values along with a generated "priority" using "desire" and "reason". This site uses forms for each of the submission options, and allows the submission and deletion of items. Websites that helped me in the process of this assignment (the information kind of blended together but these should be everything): W3Schools, GeeksForGeeks, Mozilla Developer, and Stack Overflow (no code was copied though, only referenced).

In total, the application has:

-A server that both serves files and maintains a tabular dataset of three fields ({ "idea": "", "reason": "", "desire": "" })
-A results section that loads up on the same page, showing the data in the server's memory
-An entry functionality that allows users to submit and remove data
-Server Logic that adds a derived field based of submitted fields (in this case, "reason" and "desire")
-A Derived Field that is based of fields that already exist (in this case, "priority")

- **JavaScript (Front End)**: There's a lot of JS on the client side, but it's mostly just defining consts and assigning their values. The fetch values were left mostly unchanged other than a few things shown in class. This was difficult for me as I was worried I was making things too convoluded, or I wasn't using the fetch requests right but everything seemed to work out in the end.

- **NodeJS (Back End)**: I feel as though I did not add nearly as much in the server file in comparison, but the server end took me a lot longer. It contains appdata that can be stored from user submissions, as well as removing and updating. It was really difficult for me to figure this part out, and honestly I'm not sure I did it that well, but I figured something out to the point that it shows up correctly on the page.

-**Edit Option**: I added an option to change the name of an idea that was already submitted. I used an update const to save the new value. I originally wanted to change the value for all three but honestly I couldn't figure it out so I made it so the only edit that can be made is for the idea.

### Design/Evaluation Achievements
- **CSS Styling**: Using CSS, styles including background color, font (from Google fonts), text color, text alignment, table borders, and table width have been applied to the program. This was the easiest part to implement, though it took me a little to understand how to apply styles to different things such as using a "#" for my submitButton and ".container > " for all of my grid sections. I also used a grid layout for this page, information courtesy of w3schools.

- **Peer Tester**: I asked one of my CS friends (he's not in the class, his name's Jacob Walker though) to test out my program. He told me he didn't like how I used the words "small, medium, large" for desire, and "low, medium, high" for priority. This was honestly the comment that shocked me the most, as I didn't think that the wording would have bothered someone so much for them to point it out. Honestly, I would probably make it so that those columns use the same words, as it is an incredibly easy fix (I didn't do that, though, I made the words different on purpose and like it better that way)
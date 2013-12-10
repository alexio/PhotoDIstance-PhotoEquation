Photo Equation Solver App
=========================

Android Code:
    1. Takes photo of a legible equation (photo must be of good quality) and sends it for processing server side.
    2. After image is processed, app receives a response in json and presents both the equation and solution to the user.
    
ServerCode:
    1. Server listens for post from Android app. After a valid post is recieved, server calls Tesseract (an open source OCR engine) which processes the image and converts it to text. The resulting equation is sent to the Wolfram Alpha API for evaluation. After a valid response is retrieved from Wolfram Alpha, the server sends a json response to the android app with a solution to the photo equation.
  
Server Setup
============
  1. Install a tesseract and its dependencies. Afterwards, use the eng and equ languages datasets to train it for more accurate image processing.
  2. We used Nodejs for serverside transactions (execution of tesseract and wolfram alpha api connections).

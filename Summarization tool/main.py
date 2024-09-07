from flask import Flask, request, jsonify
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import sent_tokenize, word_tokenize

from sumy.parsers.plaintext import PlaintextParser
from sumy.nlp.tokenizers import Tokenizer
from sumy.summarizers.lsa import LsaSummarizer

# Download necessary NLTK resources
nltk.download('punkt')
nltk.download('stopwords')

app = Flask(___name___)

@app.route('/summarize', methods=['POST'])

def summarize_text():
    data=request.get_json()
    text=data.get('text','')

    #validate input
    if not text or len(text.split()) <50:
        return jsonify({'error':'Text too short for summarization'}),400
# Sample text
text = """Natural Language Processing (NLP) is a sub-field of artificial intelligence (AI) focused on the interaction between computers and humans through natural language. The ultimate goal of NLP is to enable computers to understand, interpret, and generate human languages in a valuable way."""

# Preprocess the text with NLTK
stop_words = set(stopwords.words('english'))
word_tokens = word_tokenize(text)
filtered_text = ' '.join([word for word in word_tokens if word.lower() not in stop_words])

# Summarize the preprocessed text with Sumy
parser = PlaintextParser.from_string(filtered_text, Tokenizer("english"))
summarizer = LsaSummarizer()
summary = summarizer(parser.document, 5)  # Summarize into 5 sentences

#Convert summary to a single string
summary_text=''.join([str(sentence) for sentence in summary])

return jsonify({'summary':summary_text})

if ___name___=='__main__':app.run(debug=True)

# Print the summary
for sentence in summary:
    print(sentence)
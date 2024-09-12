from flask import Flask, jsonify, render_template
import speedtest as sp

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test-speed')
def test_speed():
    # A var recebe o método void
    test = sp.Speedtest()

    # A var recebe o método void - instancia todas as propriedades de download
    down = test.download()
    rsDown = round(down)  # mede o download
    fDown = int(rsDown / 1e+6)  # converte em Mb

    upload = test.upload()
    rsUp = round(upload)  # mede o upload
    fUp = int(rsUp / 1e+6)

    # Retorna os resultados em JSON
    return jsonify({
        'download': fDown,
        'upload': fUp
    })

if __name__ == '__main__':
    app.run(debug=True)

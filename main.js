$(document).ready(function() {
  class Calculator {
    constructor(result, number) {
      this.result = result;
      this.number = number;
      this.lastWord = this.result.slice(-1);
      this.operator = ["+", "-", "*", "/"];
      this.dot = ".";
    }

    // 入力指定
    inputNumber() {
      this.addResult();
      this.decimalLimit();
      this.resultOverwrite();
      this.inputLimit();
    }

    // 演算子入力指定
    inputOperator() {
      if (this.operator.includes(this.number)) {
        this.inputNumber();
        this.inputOperatorLimit() 
      } else if (this.number === this.dot) {
        this.inputNumber();
        this.inputOperatorLimit();
        this.inputDotLimit();
      } else if (this.number === "AC") {
        this.clear();
      } else if (this.number === "=") {
        this.cal();
      }
    }

    // 計算
    cal() {
      calFlag = true;
      $calResult.text(eval(this.result));
    }

    // クリア
    clear() {
      calFlag = false;
      decimal = false;
      this.number = 0;
      this.setResult() 
    }

    inputLimit() {
      // resultが0の時
      if (this.result === "0") {
        // numberが数字の時resultを上書きする
        this.result = null;
        this.setResult();
        if (this.number === this.dot) {
          // numberがドットの時０を残して入力する
          this.result = 0;
          this.addResult();
        } else if (this.number === "00" || this.operator.includes(this.number)) {
          //numberが00もしくは演算子の時入力しない
          this.clear();
        }
      }

      if (this.operator.includes(this.lastWord) && this.number === "00") {
        // 演算子が直前に入力されている時、00を入力しない
        this.stopResult();
      }
    }

    inputOperatorLimit() {
      if (this.operator.includes(this.lastWord) || this.lastWord === this.dot) {
        // resultの最後の文字が演算子またはドットの時、最後の文字をnumberで上書き
        this.lastWordOverwrite();
      }
    }

    inputDotLimit() {
      if (this.operator.includes(this.lastWord)) {
        // resultの最後の文字が演算子の時０とnumberを入力する
        $calResult.text(this.result + "0" + this.number);
      }
    }

    decimalLimit() {
      if (this.dot.includes(this.lastWord) && isFinite(this.number)) {
        decimal = true;
      } else if (this.operator.includes(this.number)) {
        decimal = false;
      }

      if (decimal && this.dot.includes(this.number)) {
        // decimalがtrueの時、ドットは入力できない
        this.stopResult(); 
      }
    }

    resultOverwrite() {
      if (calFlag && this.number === "00") {
        // calフラグがtrueかつ00が入力された時0にする
        this.clear();
      } else if (calFlag && isFinite(this.number)) {
        // calフラグがtrueかつ数字が入力された時resultを上書きする
        this.setResult();
      }
      if (this.number !== "=") {
        calFlag = false;
      }
    }

    addResult() {
      // resultにnumberを追加
      $calResult.text(this.result + this.number);
    }

    setResult() {
      //resultをnumberにする
      $calResult.text(this.number);
    }

    stopResult() {
      // resultを更新しない
      $calResult.text(this.result);
    }

    lastWordOverwrite() {
      // 最後の文字を上書きして入力する
      $calResult.text(this.result.slice(0, -1) + this.number);
    }
  }

  const $calResult = $(".cal-result-text");
  const $calButton = $(".cal-btn");
  let calFlag = false;
  let decimal = false;

  function buttonClick(result, dataId) {
    let calculator = new Calculator(result, dataId); // Calculatorクラスをインスタンス化

    if (isNaN(dataId)) { // もし入力が記号なら
      calculator.inputOperator();
    } else { // もし入力が数字なら
      calculator.inputNumber();
    }
  }

  $calButton.click(function() {
    const $result = $calResult.text();
    const $dataId = $(this).data("id");
    buttonClick($result, $dataId); // クリック時のresultとdata-idを取得
  });
});


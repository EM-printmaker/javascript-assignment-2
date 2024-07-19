$(document).ready(function(){

  const $result = $(".cal-result-text");
  const $button = $(".cal-btn");
  let calFlag = false;
  let decimal = false;
  const operator = ["+", "-", "*", "/"];
  const dot = ".";


  // ボタンの数値を取得して実行
  $button.click(function() {
    const $dataId = $(this).data('id');
    const $now = $result.text();
    const lustWord = $now.slice(-1);
    const lustWordDelete = $now.slice(0, -1);

    // 文字入力制限
    const input = () => {
      if ($now === "0" && $dataId === dot) {
        $result.text($now + $dataId); // 0かつ入力が.ドットの時、０を消さない
      } else if ($now === "0" && $dataId === "00") {
        $result.text($now); //0かつ入力が00の時、00を入力しない
      } else if ($now === "0" && operator.includes($dataId)) {
        $result.text($now); // 0かつ入力が演算子の時、演算子を入力しない
      } else if ($now === "0") {
        $result.text($dataId);  // 0だけの時、0を消して数字を入れる
      } else {
        $result.text($now + $dataId); // 0じゃない時、数値を横に足す
      }
    }

    const operatorInput = () => {
      // 連続入力制限
      if (operator.includes(lustWord) && operator.includes($dataId)) {
        $result.text(lustWordDelete + $dataId); // 演算子が連続して入力された時、演算子は上書きされる
      } else if (operator.includes(lustWord) && $dataId === "00") {
        $result.text($now); // 演算子が直前に入力されている時、00を入力しない
      } else if (dot.includes(lustWord) && dot.includes($dataId)) {
        $result.text(lustWordDelete + $dataId); // .ドットが連続して入力された時、ドットは上書きされる
      } else if (operator.includes(lustWord) && dot.includes($dataId)) {
        $result.text($now + "0" + $dataId); // 演算子が直前に入力されており.ドットが入力された時、ドットの前に0を入れる
      } else if (dot.includes(lustWord) && operator.includes($dataId)) {
        $result.text(lustWordDelete + $dataId); //.ドットが直前に入力されており演算子が入力された時、ドットを削除する
      }
    }

    // 小数点制御 (error: 演算子の次に整数のみが入力されて計算された時、結果が小数点でもドットが入力できてしまう)
    const inputDecimal = () => {
      if (dot.includes(lustWord) && isFinite($dataId)) {
        decimal = true;
      } else if (operator.includes($dataId)) {
        decimal = false;
      }

      if (decimal && dot.includes($dataId)) {
        $result.text($now); // decimalがtrueの時、ドットは入力できない
      }
    }

    // 計算後に新しく数字を打ち込むとクリアされる
    const inputClear = () => {
      if (calFlag && $dataId === "00") {
        $result.text("0"); // calフラグがtrueかつ00が入力された時0にする
      } else if (calFlag && isFinite($dataId)) {
        $result.text($dataId); // calフラグがtrueかつ数字が入力された時resultを上書きする
      }
      if ($dataId !== "=") {
        calFlag = false;
      }
    }

    // 計算
    const cal = () => {
      calFlag = true;
      $result.text(eval($now)); // idが = の時、結果を出力
    }

    // クリア
    const clear = () => {
      calFlag = false;
      decimal = false;
      $result.text(0); // idがACの時、計算をクリアする
    }
    
    input();
    operatorInput();
    inputDecimal();
    inputClear();
    
    if ($dataId === "=") {
      cal();
    }
    if ($dataId === "AC") {
      clear();
    }
  });
});
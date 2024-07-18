$(document).ready(function(){

  const $result = $(".cal-result-text");
  const $button = $(".cal-btn");
  let decimal = false;


  // ボタンの数値を取得して実行
  $button.click(function() {
    const $dataId = $(this).data('id');
    const $now = $result.text();
    const operator = ["+", "-", "*", "/"];
    const dot = ".";
    const lustWord = $now.slice(-1);
    const lustWordDelete = $now.slice(0, -1);


    // 文字入力制限
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

    // 小数点制御(途中)
    if ($dataId === dot) {
      decimal = true;
      $result.text($now + dot);
    } else if ($dataId === operator) {
      decimal = false;
    }

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

    // 計算とクリア
    if ($dataId === "=") {
      $result.text(eval($now)); // idが = の時、結果を出力
    } else if ($dataId === "AC") {
      $result.text(0); // idがACの時、計算をクリアする
    }
  });
});
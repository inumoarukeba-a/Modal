# Loop-Slide
CSSで動くループスライダーです。
なめらかに動いてくれたらいいなぁって思って作りました。


## Features
* リンク貼れます。
* hoverしたらストップも出来ます。
* スマホでもええ感じになってくれればいいなぁ。微調整必要かもです。
* その他、逆再生や複数スライダー設置などHTMLxCSSなので融通ききます。（わからなければ聞いてください）

## How to

### 1. loop-slide.scssをインポート

mixinとfunctionも使っているので、
足りない場合は、mixin.scssとfunction.scssともインポートしてください。
（ほとんどの場合は気にしなくてokです。）

### 2. loop-slide.scssの設定を変更
下記を編集してもらえればだいたいはokです。

```
$element      : ".loop-slide";  // 要素名
$item-width   : 320;            // アイテムの横幅
$item-height  : 320;            // アイテムの高さ
$item-margin  : 16;             // アイテムのマージン
$item-num     : 3;              // アイテムの数
$duration     : 25;             // アニメーションの早さ
$hover-stop   : false;          // ホバーでストップする:true しない:false
$sp-mag       : .5;             // SP表示時の倍率
```

### 3. HTMLを記述
※ 継ぎ目なく表示するために同じ```<ul>```を2つ書いてください。

```
<section class="loop-slide">
  <div class="loop-slide__list-wrap">
    <ul class="loop-slide__list">
      <li class="loop-slide__item">
        <img
          src="http://placehold.jp/320x320.png?text=01"
          srcset="http://placehold.jp/640x640.png?text=01 2x,
                  http://placehold.jp/320x320.png?text=01 1x"
          alt="" width="320" height="320">
      </li>
      <li class="loop-slide__item">
        <img
          src="http://placehold.jp/320x320.png?text=02"
          srcset="http://placehold.jp/640x640.png?text=02 2x,
                  http://placehold.jp/320x320.png?text=02 1x"
          alt="" width="320" height="320">
      </li>
      <li class="loop-slide__item">
        <img
          src="http://placehold.jp/320x320.png?text=03"
          srcset="http://placehold.jp/640x640.png?text=03 2x,
                  http://placehold.jp/320x320.png?text=03 1x"
          alt="" width="320" height="320">
      </li>
    </ul>
    <ul class="loop-slide__list -clone">
      <li class="loop-slide__item">
        <img
          src="http://placehold.jp/320x320.png?text=01"
          srcset="http://placehold.jp/640x640.png?text=01 2x,
                  http://placehold.jp/320x320.png?text=01 1x"
          alt="" width="320" height="320">
      </li>
      <li class="loop-slide__item">
        <img
          src="http://placehold.jp/320x320.png?text=02"
          srcset="http://placehold.jp/640x640.png?text=02 2x,
                  http://placehold.jp/320x320.png?text=02 1x"
          alt="" width="320" height="320">
      </li>
      <li class="loop-slide__item">
        <img
          src="http://placehold.jp/320x320.png?text=03"
          srcset="http://placehold.jp/640x640.png?text=03 2x,
                  http://placehold.jp/320x320.png?text=03 1x"
          alt="" width="320" height="320">
      </li>
    </ul>
  </div>
</section>
```

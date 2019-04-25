<?php
  //共通
  require_once substr($_SERVER['SCRIPT_FILENAME'], 0, -strlen($_SERVER['SCRIPT_NAME'])).'/common/includes/init.php';

  //メタディスクリプション
  $description = '';

  //メタキーワード
  $keywords = '';

  //Facebook　全ページ共通の場合は空白にしてください
  $fbimage = '';

  //タイトル
  $title = '';

  //css追加
  $ex_tag_css = '<link rel="stylesheet" href="/common/css/modal.css">';

  //js追加
  $ex_tag_js = '<script src="/common/js/modal.js" defer></script>';

?>
<?php include 'header.php'; ?>

  <!-- Main
  −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− -->
  <main class="main" role="main">
    <!-- Modal Trigger
    −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− -->
    <ul>
      <li><a href="#modal01" class="modal__trigger">モーダル01</a></li>
      <li><a href="#modal02" class="modal__trigger">モーダル02</a></li>
      <li><a href="#modal03" class="modal__trigger">モーダル03</a></li>
    </ul>

    <!-- Modal
    −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− -->
    <article class="modal">
      <section class="modal__item" id="modal01">
        <div class="modal__wrap">
          <p>コンテンツ01</p>
          <aside class="modal__close">
            <span>閉じる</span>
          </aside>
          <aside class="modal__prev"></aside>
          <aside class="modal__next"></aside>
        </div>
      </section>
      <section class="modal__item" id="modal02">
        <div class="modal__wrap">
          <p>コンテンツ02</p>
          <aside class="modal__close">
            <span>閉じる</span>
          </aside>
          <aside class="modal__prev"></aside>
          <aside class="modal__next"></aside>
        </div>
      </section>
      <section class="modal__item" id="modal03">
        <div class="modal__wrap">
          <p>コンテンツ03</p>
          <aside class="modal__close">
            <span>閉じる</span>
          </aside>
          <aside class="modal__prev"></aside>
          <aside class="modal__next"></aside>
        </div>
      </section>
    </article>
  </main>

<?php include 'footer.php'; ?>

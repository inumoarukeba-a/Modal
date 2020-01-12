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
      <?php for($i = 0; $i < 3; $i++):?>
      <li><a href="#modal<?php echo $i;?>" class="modal__trigger">モーダル<?php echo $i;?></a></li>
      <?php endfor;?>
    </ul>

    <!-- Modal
    −−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−−− -->
    <aside class="modal">
      <?php for($i = 0; $i < 3; $i++):?>
      <section class="modal__item" id="modal<?php echo $i;?>">
        <div class="modal__wrap">
          <div class="modal__inner">
            <p>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Pariatur ipsa sit eveniet modi officia dicta illum facere. Adipisci dicta sed vel error itaque. Similique explicabo dolor est eos nemo animi?
              Est error vero molestias adipisci vitae rem deleniti velit numquam quidem tenetur libero qui dolores commodi, corrupti dicta ullam labore quas, sint voluptatum culpa. Impedit cum eum consequuntur illum esse?
              Error sed ex ducimus eaque dolorum omnis non aliquam dicta, quidem eligendi dolor asperiores amet animi perferendis possimus ea, dignissimos voluptatem natus cupiditate maxime. Aut sapiente ducimus doloremque earum officiis.
              Exercitationem asperiores dolor quia dolore vel iste eius quod vitae nam quo? Officia totam blanditiis eius repellendus possimus facere culpa ducimus placeat eos eveniet voluptate, impedit minus sit, distinctio voluptatem.
              Consequuntur vitae officia earum dignissimos, ducimus quae excepturi animi ipsum porro vero. Ea eligendi perferendis doloribus accusamus aliquam id necessitatibus minima ducimus nulla cum sit provident, quasi esse fugit vitae.
            </p>
            <p class="modal__closeButton">
              <span class="modal__closeIcon"></span>
              閉じる
            </p>
            <p class="modal__closeInterface"></p>
          </div>
          <aside class="modal__utility">
              <div class="modal__prev">
                <?php include 'svg_arrow.php'; ?>
              </div>
              <div class="modal__next">
                <?php include 'svg_arrow.php'; ?>
              </div>
            </aside>
        </div>
      </section>
      <?php endfor;?>
    </aside>
  </main>

<?php include 'footer.php'; ?>

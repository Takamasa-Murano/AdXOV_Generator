<template>
<div id="generatorEntity">
  <div id="input">
    <p>ゾーンタイプ：
      <select id="zone_type" v-model="zoneType" @change="inputPreApp">
        <option name="type_sp_ov" selected="selected">SPオーバーレイ</option>
        <option name="type_st_bn">スタンダードバナー</option>
      </select>
    </p><br>
    
    <p>ZID：
      <input type="number" id="zoneId" size="10" maxlength="20" v-model="zoneId" @change="inputPageGAMTag"><br>
    </p>
    <p>Aladdinタグ：
      <input type="text" id="aladdinTag" size="80" v-model="aladdinTag" @change="inputPageGAMTag"><br>
    </p>
    <p>高さ：
      <input type="number" id="OVHeight" size="10" v-model="height" @change="inputPreApp">px<br>
    </p><br>
    
    <div @change="inputPreApp">
      PRバー設定<br>
      <p>
        PRバーをつける <input type="checkbox" id="isPRbar" v-model="PRchecked">
      </p>
      <div v-show="PRchecked">
      <p>
        PRバー背景色：<input type="color" id="prBackground" value="#FFFFFF" v-model="prBarStatus.prBackground">
      </p>
      <p>
        PRテキスト縦幅：<input type="number" id="prTextHeight" size="10" maxlength="20" value="20" v-model="prBarStatus.prTextHeight">px
      </p>
      <p>
        PRテキストカラー：<input type="color" id="prTextColor" value="#000000" v-model="prBarStatus.prTextColor">
      </p>
      <p>
        PRテキストサイズ：<input type="number" id="prTextSize" size="10" value="15" v-model="prBarStatus.prTextSize">px
      </p>
      <p>
        PRテキスト：<input type="text" id="prText" size="10" maxlength="20" value="[PR]" v-model="prBarStatus.prText">
      </p>
      </div>
    </div><br>

    <p @change="inputAll">横幅拡大：<br>
      <select id="isExtend" v-model="isExtendIn">
        <option name="no_extend" selected="selected">拡大しない</option>
        <option name="aladdin_extend">Aladdin配信時のみ</option>
        <option name="extend">Aladdin配信時・AdX配信時ともに</option>
      </select>
    </p><br>
    <p @change="inputAll">Xボタン設定：<br>
      Xボタンをつける → 
      <select id="isCloseButton" v-model="closeButtonAdd">
        <option name="no_close_button" selected="selected">不要</option>
        <option name="aladdin_close_button">Aladdin配信時のみ</option>
        <option name="close_button">Aladdin配信時・AdX配信時ともに</option>
      </select><br>
      <span v-show="closeButtonAdd!=='不要'">Xボタンの設定
        <p>
          Xボタンサイズ：<input type="number" id="closeButtonSize" size="10" v-model="closeButtonStatus.closeButtonSize">px
        </p>
        <select id="isCloseButton" v-model="closeButtonStatus.closeButtonPos">Xボタンの配置
          <option name="close_button_right">左</option>
          <option name="close_button_center">中央</option>
          <option name="close_button_left" selected="selected">右</option>
        </select><br>
        <input type="checkbox" id="closeButtonImageChange" v-model="isCloseButtonImageChange">画像を変更する
        <div id="closeButtonImage" v-show="isCloseButtonImageChange">
           画像のURL：<input type="url" id="closeButtonImageUrl" v-model="closeButtonStatus.closeButtonUrl"><br>
           <span style="font-size:10px;">プレビュー →</span>
           <img v-bind:src="closeButtonStatus.closeButtonUrl" v-bind:key="closeButtonStatus.closeButtonUrl" id="closeButtonImageElm" alt="画像URL無効"><br>
        </div>
      </span>
    </p><br>
    
    <p @change="inputPreApp">ページ最下部まで来るとOV最上部固定になる設定：<br>
      <select id="isUpshift" v-model="isUpshiftIn">
        <option name="no_upshift" selected="selected">不要</option>
        <option name="aladdin_upshift">Aladdin配信時のみ</option>
        <option name="upshift" disabled>Aladdin配信時・AdX配信時ともに（AdX未許可）</option>
      </select>
    </p><br>
    
    <p @change="inputPreApp">異なる高さのクリエイティブを配信する設定：<br>
      <select id="isHeightChange" v-model="isHeightChangeIn">
        <option name="no_heightChange" selected="selected">不要</option>
        <option name="aladdin_heightChange">Aladdin配信時のみ</option>
        <option name="heightChange" disabled>Aladdin配信時・AdX配信時ともに（AdX不要）</option>
      </select>
    </p><br>
    
    <div id="wholeNormalGAM" @change="processingGAMTag">加工前GAMタグ
      <p>
        headタグ：<textarea type="text" id="headNormalGAM" class="GAMinput" v-model="normalGAMheadTag"></textarea>
      </p>
      <p>
        bodyタグ：<textarea type="text" id="bodyNormalGAM" class="GAMinput" v-model="normalGAMbodyTag"></textarea>
      </p>
    </div>
    
  </div>
  
  <div id="output">
    
    <div>ゾーンタイプ
      <textarea id="zonetypeOutput" size="30" v-model="zoneType" readonly></textarea><br>
    </div>
    <div>ゾーン編集画面追記コード
      <p>
        Prepend：<textarea type="text" id="prependText" class="outputText" v-model="prepend" readonly></textarea>
      </p>
      <p>
        Append：<textarea type="text" id="appendText" class="outputText" v-model="append" readonly></textarea>
      </p>
    </div>
    
    <div>
      <p>
        GAMクリエイティブ欄追記コード<textarea type="text" id="GAMCreativeText" class="outputText" v-model="creativeTag" readonly></textarea>
      </p>
    </div>
    
    <div >完成GAMタグ
      <p>
        headタグ：<textarea type="text" id="headCompletedGAM" class="outputText" v-model="GAMheadTag" readonly></textarea>
      </p>
      <p>
        bodyタグ：<textarea type="text" id="bodyCompletedGAM" class="outputText" v-model="GAMbodyTag" readonly></textarea>
      </p>
    </div>
  </div>
</div>
</template>

<script type="text/javascript" src="./App.js"></script>

<style>
  body {
    background-color: #DDDDDD;
    color: black;
  }
  #description {
    text-align: left;
    margin-bottom: 20px;
  }
  #input {
    float:left;
    max-width:49%;
    text-align: left;
  }
  #input input {
    width: 70px;
  }
  #aladdinTag {
    width: 75% !important;
  }
  select {
    background-color:white;
  }
  .GAMinput, .outputText {
    width:80%;
    height:150px;
  }
  #wholeNormalGAM {
    border: solid 1px black;
  }
  #wholeNormalGAM > p {
    margin-left: 15px;
  }
  #output {
    margin-left:55%;
    border: solid 3px black;
    text-align: left;
    background-color: #BBBBBB; 
  }
  #output > * {
    padding-left: 5px;
  }
  #output > div {
    border-top: solid 1px #333333;
  }
  #output > div * {
    margin-left: 5px;
  }
  #output .outputText {
    width: 96%;
    height:150px;
  }
  #zonetypeOutput {
    width:150px;
    height:18px;
  }
  #closeButtonImage {
    margin-left: 20px;
  }
  #closeButtonImage > span {
    font-size:10px;
    margin-left: 20px;
  }
  #closeButtonImageElm{
    width:20px;
    height:20px;
    margin-left:3px;
  }
</style>
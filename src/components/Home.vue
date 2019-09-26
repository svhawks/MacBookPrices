<template>
  <div>
    <a href="https://github.com/svtek/MacScores" target="_blank">
      <img
        style="position: absolute; top: -30px; right: 0; border: 0;"
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png"
        alt="Fork me on GitHub"
      />
    </a>

    <div class="my-3 my-md-5 mx-9">
      <div class="container-fluid">
        <div class="row">
          <div class="col-sm-6 col-lg-3">
            <div class="card geek">
              <div class="card-body text-center">
                <div>
                  <a :href="geekBenchLink()">
                    <img src="../../img/geekbench.png" style="max-height: 3em;" />
                  </a>
                </div>
                <p></p>
                <div>Scores From</div>
                <div>
                  <a :href="geekBenchLink()">Geekbench.com</a>
                </div>
                <p></p>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card">
              <div class="card-body">
                <h3 class="mb-1">Best Macbook Per $</h3>
                <a :href="profileLink(bestMacbook.id,bestMacbook.name)">{{bestMacbook.name}}</a>
                <div class="text-muted">{{bestMacbook.description}}</div>
                <div class="text-muted">${{bestMacbook.price}}</div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card">
              <div class="card-body">
                <h3 class="mb-1">Best iMac Per $</h3>
                <a :href="profileLink(bestIMac.id,bestIMac.name)">{{bestIMac.name}}</a>
                <div class="text-muted">{{bestIMac.description}}</div>
                <div class="text-muted">${{bestIMac.price}}</div>
              </div>
            </div>
          </div>
          <div class="col-sm-6 col-lg-3">
            <div class="card">
              <div class="card-body">
                <h3 class="mb-1">Best Mac Mini Per $</h3>
                <a :href="profileLink(bestMacMini.id,bestMacMini.name)">{{bestMacMini.name}}</a>
                <div class="text-muted">{{bestMacMini.description}}</div>
                <div class="text-muted">${{bestMacMini.price}}</div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div
              v-if="['macbook pro', 'macbook air', 'all', 'imac', 'imac pro', 'mac mini'].indexOf(selectedType) > -1"
              class="card"
            >
              <div class="card-header">
                <h3 class="card-title">Filter</h3>
                <div class="card-options">
                  <button class="btn btn-sm btn-primary" @click="selectedType = ''">Close</button>
                </div>
              </div>
              <div class="card-body">
                <div class="row">
                  <div class="col-4">
                    <div class="form-group">
                      <label class="text-center form-label">Single-Score</label>
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Min"
                          v-model="singleMinScore"
                          @keyup="filterMacsAcrossFilters"
                        />
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Max"
                          v-model="singleMaxScore"
                          @change="filterMacsAcrossFilters"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="form-group">
                      <label class="text-center form-label">Multi Score</label>
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Min"
                          v-model="multiMinScore"
                        />
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Max"
                          v-model="multiMaxScore"
                        />
                      </div>
                    </div>
                  </div>
                  <div class="col-4">
                    <div class="form-group">
                      <label class="text-center form-label">Price</label>
                      <div class="input-group">
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Min"
                          v-model="minPrice"
                        />
                        <input
                          type="number"
                          class="form-control"
                          placeholder="Max"
                          v-model="maxPrice"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="card">
            <div class="card-header">
              <div class="form-gruop">
                <div class="input-icon">
                  <input
                    v-model="nameFilter"
                    style="width: 300px!important"
                    type="text"
                    class="form-control"
                    placeholder="Search for..."
                    @keyup="filterMacsAcrossFilters"
                  />
                  <span class="input-icon-addon">
                    <i class="fe fe-search"></i>
                  </span>
                </div>
              </div>
              <div>
                <div @click="filterBtn('all')" class="btn ">
                  <svg version="1.1" class="row m-auto"
                    xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                    x="0px" y="0px" width="36px" height="24px" viewBox="0 0 70 54" style="enable-background:new 0 0 70 54;" xml:space="preserve">
                    <g id="Dark">
                    </g>
                    <g id="Light">
                      <path id="Mac_Compare" style="fill:#333333;" d="M42,49V28.5c0-0.96-0.52-1.5-1.5-1.5h-35C4.52,27,4,27.5,4,28.5V49H0
                        c0.05,0.09,0.13,0.32,0.21,0.32c0,0,2.07,1.25,4.64,1.42C7.42,50.92,9.99,51.01,10,51c0,0,13,0,13,0l13,0c0,0,2.36-0.08,4.93-0.25
                        c2.57-0.17,4.64-1.42,4.64-1.42c0.08,0,0.38-0.23,0.44-0.32H42z M6,29h34v20H6V29z M52.95,51L52.95,51
                        c0.02-0.01,0.03-0.01,0.04-0.02c0.14-0.04,0.24-0.17,0.24-0.32c0-0.19-0.15-0.34-0.35-0.34c-0.03,0-0.04,0-0.07,0
                        c-1.36,0.09-2.63-0.82-2.93-2.19L49,44h19.47c0.7,0,1.53-0.83,1.53-1.53V12.53c0-0.7-0.83-1.53-1.53-1.53H23.53
                        c-0.7,0-1.53,0.83-1.53,1.53L22.02,26L24,26V13h44v25H43v6v4h4v1c-0.04,1.54-3,2-3,2H52.95z M46.95,41.83
                        c-0.03,0.06-0.06,0.12-0.09,0.17c-0.03,0.05-0.07,0.1-0.1,0.14c-0.03,0.04-0.06,0.07-0.08,0.08c-0.04,0.03-0.07,0.05-0.11,0.07
                        c-0.03,0.02-0.07,0.03-0.11,0.03c-0.02,0-0.06-0.01-0.09-0.02c-0.04-0.01-0.07-0.02-0.11-0.03c-0.04-0.01-0.08-0.02-0.11-0.04
                        c-0.04-0.01-0.07-0.01-0.1-0.01c-0.03,0-0.07,0-0.11,0.02c-0.04,0.01-0.08,0.02-0.12,0.04c-0.04,0.01-0.08,0.02-0.11,0.04
                        c-0.03,0.01-0.06,0.02-0.08,0.02c-0.03,0-0.06-0.01-0.09-0.02c-0.03-0.01-0.06-0.03-0.09-0.05c-0.03-0.02-0.06-0.06-0.1-0.1
                        c-0.04-0.04-0.07-0.09-0.12-0.15c-0.04-0.06-0.07-0.12-0.11-0.19c-0.03-0.07-0.06-0.14-0.08-0.22c-0.02-0.07-0.04-0.15-0.05-0.22
                        c-0.01-0.08-0.02-0.15-0.02-0.22c0-0.11,0.02-0.21,0.05-0.3c0.03-0.09,0.08-0.17,0.13-0.24c0.06-0.07,0.12-0.12,0.2-0.16
                        c0.08-0.04,0.16-0.06,0.25-0.06c0.07,0,0.14,0.02,0.23,0.06c0.09,0.04,0.15,0.06,0.18,0.06c0.01,0,0.03-0.01,0.06-0.02
                        c0.03-0.01,0.08-0.03,0.14-0.05c0.06-0.02,0.1-0.03,0.14-0.04c0.04-0.01,0.07-0.01,0.11-0.01c0.1,0,0.19,0.02,0.28,0.07
                        c0.09,0.05,0.16,0.11,0.21,0.19c-0.09,0.06-0.16,0.13-0.21,0.21c-0.04,0.08-0.06,0.17-0.06,0.28c0,0.11,0.03,0.21,0.09,0.31
                        c0.06,0.09,0.14,0.16,0.25,0.21C47,41.7,46.97,41.77,46.95,41.83z M46,40.31c0-0.06,0.01-0.12,0.04-0.19
                        c0.03-0.06,0.06-0.12,0.11-0.17c0.04-0.05,0.1-0.09,0.16-0.12c0.06-0.03,0.13-0.05,0.19-0.05c0,0.01,0,0.02,0,0.03v0.03
                        c0,0.06-0.01,0.13-0.04,0.2c-0.03,0.06-0.06,0.12-0.11,0.17c-0.04,0.05-0.09,0.09-0.15,0.12c-0.06,0.03-0.11,0.05-0.17,0.05
                        c-0.02,0-0.04,0-0.04-0.01C46,40.34,46,40.32,46,40.31z"/>
                    </g>
                  </svg>
                  <span>All</span>
                </div>
                <div @click="filterBtn('macbook pro')" class="btn">
                  <svg
                    class="row m-auto"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="28px"
                    height="27px"
                    viewBox="0 0 58 54"
                    enable-background="new 0 0 58 54"
                    xml:space="preserve"
                  >
                    <g id="Dark" />
                    <g id="Light">
                      <g id="Mac">
                        <path
                          id="MacBook_Pro"
                          fill="#333333"
                          d="M52.987,48V20.503c0-0.832-0.643-1.49-1.491-1.49H6.503c-0.848,0-1.49,0.658-1.49,1.49
                            V48H0v1.428C0.639,50.462,4.094,51,5.465,51h46.696c1.372,0,5.2-0.538,5.839-1.572V48H52.987z M7,21h44v27H7V21z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>Macbook Pro</span>
                </div>
                <div @click="filterBtn('macbook air')" class="btn">
                  <svg
                    class="row m-auto"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="28px"
                    height="27px"
                    viewBox="0 0 52 54"
                    enable-background="new 0 0 52 54"
                    xml:space="preserve"
                  >
                    <g id="Dark" />
                    <g id="Light">
                      <g id="Mac">
                        <path
                          id="MacBook_Air"
                          fill="#333333"
                          d="M47,49V25.5c0-0.958-0.522-1.5-1.5-1.5h-39C5.522,24,5,24.504,5,25.5V49H0
                              c0.053,0.092,0.127,0.323,0.211,0.323c0,0,2.071,1.248,4.639,1.422c2.566,0.174,7.59,0.264,7.596,0.252
                              C12.448,50.994,25.366,51,25.366,51l12.969-0.003c0,0,6.023-0.081,8.59-0.252c2.568-0.171,4.639-1.422,4.639-1.422
                              c0.084,0,0.383-0.231,0.436-0.323H47z M7,26h38v23H7V26z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>Macbook Air</span>
                </div>
                <div @click="filterBtn('imac')" class="btn">
                  <svg
                    class="row m-auto"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="28px"
                    height="34px"
                    viewBox="0 0 48 54"
                    enable-background="new 0 0 48 54"
                    xml:space="preserve"
                  >
                    <g id="Dark" />
                    <g id="Light">
                      <g id="Mac">
                        <path
                          id="iMac_2_"
                          fill="#333333"
                          d="M46.469,11H1.531C0.831,11,0,11.833,0,12.531l0.042,29.938C0.042,43.167,0.872,44,1.572,44
                            H21l-0.89,4.119c-0.302,1.37-1.563,2.273-2.927,2.188c-0.024,0.002-0.043,0.003-0.069,0.005c-0.191,0-0.346,0.154-0.346,0.345
                            c0,0.153,0.104,0.28,0.243,0.324c0.015,0.007,0.028,0.013,0.042,0.015V51H17.2h13.75v-0.005c0.015-0.002,0.029-0.008,0.042-0.015
                            c0.141-0.043,0.244-0.17,0.244-0.324c0-0.191-0.154-0.345-0.346-0.345c-0.026-0.001-0.044-0.003-0.069-0.005
                            c-1.363,0.085-2.626-0.817-2.928-2.188L27,44h19.469C47.169,44,48,43.167,48,42.469V12.531C48,11.833,47.169,11,46.469,11z
                            M24.946,41.829c-0.03,0.06-0.061,0.117-0.093,0.167c-0.034,0.051-0.066,0.097-0.096,0.136c-0.033,0.039-0.059,0.066-0.076,0.085
                            c-0.035,0.029-0.07,0.055-0.107,0.073c-0.035,0.019-0.072,0.026-0.111,0.026c-0.025,0-0.055-0.005-0.09-0.016
                            c-0.036-0.011-0.072-0.022-0.109-0.034c-0.038-0.012-0.075-0.023-0.112-0.035c-0.039-0.01-0.072-0.015-0.103-0.015
                            c-0.033,0-0.07,0.005-0.108,0.017c-0.04,0.011-0.079,0.023-0.118,0.036c-0.04,0.013-0.077,0.024-0.109,0.035
                            c-0.033,0.01-0.062,0.015-0.083,0.015c-0.032,0-0.061-0.005-0.088-0.015c-0.029-0.011-0.059-0.029-0.09-0.054
                            c-0.031-0.025-0.062-0.058-0.096-0.1c-0.036-0.042-0.074-0.092-0.116-0.155c-0.04-0.058-0.073-0.121-0.107-0.189
                            c-0.031-0.07-0.061-0.141-0.083-0.216c-0.022-0.073-0.041-0.147-0.052-0.223c-0.013-0.075-0.021-0.147-0.021-0.219
                            c0-0.109,0.016-0.211,0.048-0.304c0.032-0.092,0.078-0.174,0.134-0.242c0.057-0.069,0.123-0.121,0.198-0.159
                            c0.075-0.037,0.157-0.056,0.246-0.056c0.065,0,0.143,0.019,0.231,0.056c0.087,0.038,0.148,0.057,0.183,0.057
                            c0.012,0,0.034-0.005,0.064-0.017c0.032-0.011,0.079-0.027,0.138-0.05c0.059-0.02,0.104-0.034,0.138-0.042
                            c0.035-0.008,0.071-0.012,0.107-0.012c0.099,0,0.19,0.023,0.28,0.071c0.088,0.046,0.159,0.108,0.21,0.186
                            c-0.095,0.057-0.164,0.125-0.208,0.206c-0.042,0.079-0.063,0.173-0.063,0.28c0,0.112,0.029,0.214,0.089,0.307
                            c0.059,0.093,0.142,0.164,0.248,0.211C25.001,41.704,24.975,41.768,24.946,41.829z M23.995,40.306
                            c0-0.063,0.014-0.125,0.042-0.188c0.028-0.062,0.063-0.121,0.111-0.173c0.044-0.049,0.098-0.092,0.16-0.125
                            c0.061-0.033,0.125-0.049,0.191-0.053c0.003,0.009,0.004,0.018,0.004,0.025v0.027c0,0.064-0.014,0.13-0.041,0.195
                            c-0.027,0.065-0.061,0.123-0.106,0.174c-0.044,0.052-0.094,0.093-0.151,0.123c-0.056,0.031-0.113,0.045-0.171,0.045
                            c-0.024,0-0.036-0.003-0.038-0.014C23.995,40.336,23.995,40.324,23.995,40.306z M46,38H2V13h44V38z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>iMac</span>
                </div>
                <div @click="filterBtn('imac pro')" class="btn">
                  <svg
                    class="row m-auto"
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    width="28px"
                    height="34px"
                    viewBox="0 0 48 54"
                    enable-background="new 0 0 48 54"
                    xml:space="preserve"
                  >
                    <g id="Dark" />
                    <g id="Light">
                      <g id="Mac">
                        <path
                          id="iMac_2_"
                          fill="#333333"
                          d="M46.469,11H1.531C0.831,11,0,11.833,0,12.531l0.042,29.938C0.042,43.167,0.872,44,1.572,44
                              H21l-0.89,4.119c-0.302,1.37-1.563,2.273-2.927,2.188c-0.024,0.002-0.043,0.003-0.069,0.005c-0.191,0-0.346,0.154-0.346,0.345
                              c0,0.153,0.104,0.28,0.243,0.324c0.015,0.007,0.028,0.013,0.042,0.015V51H17.2h13.75v-0.005c0.015-0.002,0.029-0.008,0.042-0.015
                              c0.141-0.043,0.244-0.17,0.244-0.324c0-0.191-0.154-0.345-0.346-0.345c-0.026-0.001-0.044-0.003-0.069-0.005
                              c-1.363,0.085-2.626-0.817-2.928-2.188L27,44h19.469C47.169,44,48,43.167,48,42.469V12.531C48,11.833,47.169,11,46.469,11z
                              M24.946,41.829c-0.03,0.06-0.061,0.117-0.093,0.167c-0.034,0.051-0.066,0.097-0.096,0.136c-0.033,0.039-0.059,0.066-0.076,0.085
                              c-0.035,0.029-0.07,0.055-0.107,0.073c-0.035,0.019-0.072,0.026-0.111,0.026c-0.025,0-0.055-0.005-0.09-0.016
                              c-0.036-0.011-0.072-0.022-0.109-0.034c-0.038-0.012-0.075-0.023-0.112-0.035c-0.039-0.01-0.072-0.015-0.103-0.015
                              c-0.033,0-0.07,0.005-0.108,0.017c-0.04,0.011-0.079,0.023-0.118,0.036c-0.04,0.013-0.077,0.024-0.109,0.035
                              c-0.033,0.01-0.062,0.015-0.083,0.015c-0.032,0-0.061-0.005-0.088-0.015c-0.029-0.011-0.059-0.029-0.09-0.054
                              c-0.031-0.025-0.062-0.058-0.096-0.1c-0.036-0.042-0.074-0.092-0.116-0.155c-0.04-0.058-0.073-0.121-0.107-0.189
                              c-0.031-0.07-0.061-0.141-0.083-0.216c-0.022-0.073-0.041-0.147-0.052-0.223c-0.013-0.075-0.021-0.147-0.021-0.219
                              c0-0.109,0.016-0.211,0.048-0.304c0.032-0.092,0.078-0.174,0.134-0.242c0.057-0.069,0.123-0.121,0.198-0.159
                              c0.075-0.037,0.157-0.056,0.246-0.056c0.065,0,0.143,0.019,0.231,0.056c0.087,0.038,0.148,0.057,0.183,0.057
                              c0.012,0,0.034-0.005,0.064-0.017c0.032-0.011,0.079-0.027,0.138-0.05c0.059-0.02,0.104-0.034,0.138-0.042
                              c0.035-0.008,0.071-0.012,0.107-0.012c0.099,0,0.19,0.023,0.28,0.071c0.088,0.046,0.159,0.108,0.21,0.186
                              c-0.095,0.057-0.164,0.125-0.208,0.206c-0.042,0.079-0.063,0.173-0.063,0.28c0,0.112,0.029,0.214,0.089,0.307
                              c0.059,0.093,0.142,0.164,0.248,0.211C25.001,41.704,24.975,41.768,24.946,41.829z M23.995,40.306
                              c0-0.063,0.014-0.125,0.042-0.188c0.028-0.062,0.063-0.121,0.111-0.173c0.044-0.049,0.098-0.092,0.16-0.125
                              c0.061-0.033,0.125-0.049,0.191-0.053c0.003,0.009,0.004,0.018,0.004,0.025v0.027c0,0.064-0.014,0.13-0.041,0.195
                              c-0.027,0.065-0.061,0.123-0.106,0.174c-0.044,0.052-0.094,0.093-0.151,0.123c-0.056,0.031-0.113,0.045-0.171,0.045
                              c-0.024,0-0.036-0.003-0.038-0.014C23.995,40.336,23.995,40.324,23.995,40.306z M46,38H2V13h44V38z"
                        />
                      </g>
                    </g>
                  </svg>
                  <span>iMac Pro</span>
                </div>
                <div @click="filterBtn('mac mini')" class="btn">
                  <svg class="row m-auto" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 54" width="28px"
                    height="34px">
                    <path
                      data-name="Mac Mini"
                      d="M0 44v6a.93.93 0 0 0 1 1h26a.93.93 0 0 0 1-1v-6zm23.5 5.45a.93.93 0 1 1 1-.93.95.95 0 0 1-1 .93z"
                      fill="#333"
                    />
                    <path fill="none" d="M0 0h28v54H0z" />
                  </svg>
                  <span>Mac mini</span>
                </div>
              </div>
              <div class="card-options">
                <div class="form-group mt-4 ml-1">
                  <label class="text-center form-label"></label>
                  <label class="custom-switch">
                    <input
                      type="checkbox"
                      class="custom-switch-input"
                      value="true"
                      v-model="onMarket"
                    />
                    <span class="custom-switch-indicator" />
                    <span class="custom-switch-description">On market</span>
                  </label>
                </div>
              </div>
            </div>
            <div class="table table-responsive">
              <div id="DataTables_Table_0_wrapper" class="dataTables_wrapper no-footer">
                <table
                  id="DataTables_Table_0"
                  class="table table-vcenter datatable dataTable no-footer"
                  role="grid"
                >
                  <thead>
                    <tr role="row">
                      <th
                        class="sorting unselectable"
                        tabindex="0"
                        rowspan="1"
                        colspan="1"
                        style="width: 10px;"
                      >Name</th>
                      <th
                        @click="sortGeneral('single_score')"
                        class="sorting unselectable text-center"
                        tabindex="1"
                        aria-controls="DataTables_Table_0"
                        rowspan="1"
                        colspan="1"
                        style="width: 50px;"
                      >Single Core Score</th>
                      <th
                        @click="sortGeneral('multi_score')"
                        class="sorting unselectable text-center"
                        tabindex="2"
                        rowspan="1"
                        colspan="1"
                        style="width: 50px;"
                      >Multi Core Score</th>
                      <th
                        @click="sortGeneral('price')"
                        class="sorting unselectable text-center"
                        tabindex="3"
                        aria-controls="DataTables_Table_0"
                        rowspan="1"
                        colspan="1"
                        style="width: 50px;"
                      >Stock Price</th>
                      <th
                        @click="sortPerDollarSingle"
                        class="sorting unselectable text-center"
                        tabindex="4"
                        aria-controls="DataTables_Table_0"
                        rowspan="1"
                        colspan="1"
                        style="width: 50px;"
                      >Single Score per $</th>
                      <th
                        @click="sortPerDollarMulti"
                        class="sorting unselectable text-center"
                        tabindex="5"
                        aria-controls="DataTables_Table_0"
                        rowspan="1"
                        colspan="1"
                        style="width: 50px;"
                      >Multi Score per $</th>
                      <th
                        class="w-1 sorting unselectable"
                        tabindex="1"
                        aria-controls="DataTables_Table_0"
                        rowspan="1"
                        colspan="1"
                      />
                      <th
                        class="w-1 sorting unselectable"
                        tabindex="1"
                        aria-controls="DataTables_Table_0"
                        rowspan="1"
                        colspan="1"
                        style="width: 60px;"
                      />
                    </tr>
                  </thead>
                  <div v-if="tableItems.length" style="display: contents;">
                    <tbody v-for="mac in tableItems" :key="mac.id">
                      <MacItem :mac="mac"></MacItem>
                    </tbody>
                  </div>
                  <div v-else class="card-body">
                    <span class="text-center d-inline">
                      <i class="fe fe-search" />No Item Found
                    </span>
                  </div>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MacItem from "./MacItem.vue";
import datas from "../../db.json";
import { log } from "util";
export default {
  name: "Home",
  data() {
    return {
      loading: false,
      tableItems: [],
      macs: [],
      selectedType: "",
      nameFilter: "",
      singleMinScore: "",
      singleMaxScore: "",
      minPrice: "",
      maxPrice: "",
      multiMinScore: "",
      multiMaxScore: "",
      sortField: "",
      perDFlagM: true,
      perDFlagS: true,
      onMarket: true,
      bestProduct: {
        name: "",
        description: "",
        id: "",
        price: ""
      },
      bestMacbook: {
        name: "",
        description: "",
        id: "",
        price: ""
      },
      bestIMac: {
        name: "",
        description: "",
        id: "",
        price: ""
      },
      bestMacMini: {
        name: "",
        description: "",
        id: "",
        price: ""
      }
    };
  },
  watch: {
    singleMinScore: "filterMacsAcrossFilters",
    singleMaxScore: "filterMacsAcrossFilters",
    minPrice: "filterMacsAcrossFilters",
    maxPrice: "filterMacsAcrossFilters",
    multiMinScore: "filterMacsAcrossFilters",
    multiMaxScore: "filterMacsAcrossFilters",
    onMarket: "filterMacsAcrossFilters"
  },

  created() {
    this.loading = true;
    this.macs = this.prepareRatios(datas.macs);
    this.tableItems = this.macs;
    this.bestProduct = this.findBest("");
    this.bestMacbook = this.findBest("macbook");
    this.bestIMac = this.findBest("imac");
    this.bestMacMini = this.findBest("mac mini");
    this.filterMacsAcrossFilters();
    this.sortPerDollarSingle();
    this.loading = false;
  },
  components: {
    MacItem
  },
  methods: {
    geekBenchLink() {
      return "https://www.geekbench.com/";
    },

    prepareRatios(macs) {
      macs.forEach(mac => {
        mac.multiRatio =
          mac.multi_score !== 0 || mac.price !== 0
            ? (mac.multi_score / mac.price).toFixed(2) ==
                Number.POSITIVE_INFINITY ||
              (mac.multi_score / mac.price).toFixed(2) == Number.NAN
              ? ""
              : (mac.multi_score / mac.price).toFixed(2)
            : "";
        mac.singleRatio =
          mac.single_score !== 0 || mac.price !== 0
            ? (mac.single_score / mac.price).toFixed(2) ==
                Number.POSITIVE_INFINITY ||
              (mac.single_score / mac.price).toFixed(2) == Number.NAN
              ? ""
              : (mac.single_score / mac.price).toFixed(2)
            : "";
      });
      return macs;
    },

    filterByFieldInt(macs, compareField, low, high) {
      return macs.filter(item => {
        return (
          (low || 0) <= item[compareField] &&
          item[compareField] <= (high || 1000000)
        );
      });
    },

    filterMacsAcrossFilters() {
      this.loading = true;
      let tempMacArray = this.macs.filter(mac => {
        return (
          (this.onMarket && mac.price > 0) || (!this.onMarket && mac.price == 0)
        );
      });
      tempMacArray = this.filterByFieldInt(
        tempMacArray,
        "single_score",
        this.singleMinScore,
        this.singleMaxScore
      );
      tempMacArray = this.filterByFieldInt(
        tempMacArray,
        "price",
        this.minPrice,
        this.maxPrice
      );
      tempMacArray = this.filterByFieldInt(
        tempMacArray,
        "multi_score",
        this.multiMinScore,
        this.multiMaxScore
      );
      if (this.nameFilter) {
        tempMacArray = tempMacArray.filter(mac =>
          mac.name.toLowerCase().includes(this.nameFilter.toLowerCase())
        );
      }
      if (this.selectedType && this.selectedType != "all") {
        tempMacArray = tempMacArray.filter(mac =>
          mac.name.toLowerCase().includes(this.selectedType.toLowerCase())
        );
      }
      this.tableItems = tempMacArray;
      this.loading = false;
    },

    sortGeneral(sortField) {
      // use this whenever there is no money related issue
      if (this.sortField == sortField) {
        this.tableItems = this.tableItems.reverse();
      } else {
        this.tableItems = this.tableItems.sort(
          (a, b) => b[sortField] - a[sortField]
        );
        this.sortField = sortField;
      }
    },

    sortPerDollarMulti() {
      let sorted = this.tableItems.sort((a, b) => {
        let ratio1 =
          a.multi_score !== 0 && a.price !== 0 ? a.multi_score / a.price : 0;
        let ratio2 =
          b.multi_score !== 0 && b.price !== 0 ? b.multi_score / b.price : 0;
        return ratio1 < ratio2 ? -1 : ratio1 > ratio2 ? 1 : 0;
      });
      if (this.perDFlagM) {
        this.perDFlagM = false;
        this.tableItems = sorted;
      } else {
        this.perDFlagM = true;
        this.tableItems = sorted.reverse();
      }
      this.sortField = "multi_score_per_dolar";
    },

    sortPerDollarSingle() {
      let sorted = this.tableItems.sort((a, b) => {
        let ratio1 =
          a.single_score !== 0 && a.price !== 0 ? a.single_score / a.price : 0;
        let ratio2 =
          b.single_score !== 0 && b.price !== 0 ? b.single_score / b.price : 0;
        return ratio1 < ratio2 ? -1 : ratio1 > ratio2 ? 1 : 0;
      });
      if (this.perDFlagS) {
        this.perDFlagS = false;
        this.tableItems = sorted.reverse();
      } else {
        this.perDFlagS = true;
        this.tableItems = sorted;
      }
      this.sortField = "single_score_per_dolar";
    },

    filterBtn(selectedType) {
      this.selectedType = selectedType;
      if (selectedType == "all") {
        this.nameFilter = " ";
      } else {
        this.nameFilter = selectedType;
      }
      this.filterMacsAcrossFilters();
      this.sortPerDollarSingle();
      this.perDFlagS = true;
    },

    findBest(type) {
      let macs = this.macs.filter(mac => {
        return mac.name.toLowerCase().includes(type.toLowerCase());
      });
      macs = macs.sort((a, b) => {
        let ratio1 =
          a.single_score !== 0 && a.price !== 0 ? a.single_score / a.price : 0;
        let ratio2 =
          b.single_score !== 0 && b.price !== 0 ? b.single_score / b.price : 0;
        return ratio1 > ratio2 ? -1 : ratio1 < ratio2 ? 1 : 0;
      });
      return {
        name: macs[0].name,
        description:
          macs[0].processor +
          " @ " +
          (parseFloat(macs[0].processor_freq) / 1000).toFixed(1) +
          "Ghz (" +
          macs[0].processor_cores +
          (macs[0].processor_cores == 1 ? " core) " : " cores) "),
        price: macs[0].price,
        id: macs[0].id
      };
    },

    profileLink(id, name) {
      name = name.toLowerCase().replace(/[^a-zA-Z0-9]+/g, "-");
      return `/#/macs/${name}${id}`;
    }
  }
};
</script>

<style>
.btn {
  letter-spacing: 0;
  font-weight: 300;
}
.github {
  position: absolute;
  margin-top: 1%;
  margin-left: 1%;
}
.geek {
  height: 9.8em;
}
</style>

const vaccineTimelineData = [
    {
        age: '出生时',
        planned: [
            { name: '乙肝疫苗', content: '预防乙型病毒性肝炎。出生后24小时内接种第1剂。' },
            { name: '卡介苗', content: '预防结核病。出生后24小时内接种。' }
        ],
        unplanned: []
    },
    {
        age: '1月龄',
        planned: [
            { name: '乙肝疫苗', content: '预防乙型病毒性肝炎。第2剂。' }
        ],
        unplanned: []
    },
    {
        age: '1.5月龄',
        planned: [],
        unplanned: [
            { name: '轮状病毒疫苗', content: '预防轮状病毒引起的婴幼儿腹泻。口服轮状病毒活疫苗：2月龄-3岁，每年接种1剂。口服五价重配轮状病毒减毒活疫苗（Vero细胞）：6周至32周龄婴儿，共3剂次。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿，共4剂次（2、4、6月龄各接种1剂，12-15月龄加强1剂）。' }
        ]
    },
    {
        age: '2月龄',
        planned: [
            { name: '脊灰灭活疫苗', content: '预防脊髓灰质炎病毒感染，避免罹患小儿麻痹症。Sabin株脊髓灰质炎灭活疫苗(Vero细胞)：2月龄、3月龄各接种1剂次。' },
            { name: '百白破疫苗', content: '同时预防百日咳、白喉、破伤风三种疾病。吸附无细胞百白破联合疫苗：2、4、6月龄各接种1剂次，18月龄和6岁各加强1剂次。' }
        ],
        unplanned: [
            { name: '轮状病毒疫苗', content: '预防轮状病毒引起的婴幼儿腹泻。口服轮状病毒活疫苗：2月龄-3岁，每年接种1剂。口服五价重配轮状病毒减毒活疫苗（Vero细胞）：6周至32周龄婴儿，共3剂次。' },
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：2-5周岁；2-6月龄共3剂次，每间隔1或2月接种1次。' },
            { name: '脊髓灰质炎疫苗', content: '预防脊髓灰质炎（小儿麻痹症）。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿，共4剂次（2、4、6月龄各接种1剂，12-15月龄加强1剂）。' },
            { name: '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）', content: '2月龄及以上婴幼儿，共4剂次（3、4、5、18月龄各接种1剂）。' }
        ]
    },
    {
        age: '3月龄',
        planned: [
            { name: '脊灰灭活疫苗', content: '预防脊髓灰质炎病毒感染，避免罹患小儿麻痹症。Sabin株脊髓灰质炎灭活疫苗(Vero细胞)：2月龄、3月龄各接种1剂次。' },
            { name: '百白破疫苗', content: '同时预防百日咳、白喉、破伤风三种疾病。吸附无细胞百白破联合疫苗：2、4、6月龄各接种1剂次，18月龄和6岁各加强1剂次。' }
        ],
        unplanned: [
            { name: '轮状病毒疫苗', content: '预防轮状病毒引起的婴幼儿腹泻。口服轮状病毒活疫苗：2月龄-3岁，每年接种1剂。' },
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：2-5周岁；2-6月龄共3剂次，每间隔1或2月接种1次。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿，共4剂次（2、4、6月龄各接种1剂，12-15月龄加强1剂）。' },
            { name: '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）', content: '2月龄及以上婴幼儿，共4剂次（3、4、5、18月龄各接种1剂）。' },
            { name: '无细胞百白破b型流感嗜血杆菌联合疫苗（四联）', content: '3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫）。可预防百日咳、白喉、破伤风、b型流感嗜血杆菌感染（脑膜炎、肺炎等）四种疾病。' }
        ]
    },
    {
        age: '4月龄',
        planned: [
            { name: '脊灰减毒疫苗', content: '预防脊髓灰质炎（小儿麻痹症）。口服脊髓灰质炎减毒活疫苗（bOPV）：4月龄、4周岁各接种1剂，共2剂次。' },
            { name: '百白破疫苗', content: '同时预防百日咳、白喉、破伤风三种疾病。吸附无细胞百白破联合疫苗：2、4、6月龄各接种1剂次，18月龄和6岁各加强1剂次。' }
        ],
        unplanned: [
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：2-5周岁；2-6月龄共3剂次，每间隔1或2月接种1次。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿，共4剂次（2、4、6月龄各接种1剂，12-15月龄加强1剂）。' },
            { name: '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）', content: '2月龄及以上婴幼儿，共4剂次（3、4、5、18月龄各接种1剂）。' },
            { name: '无细胞百白破b型流感嗜血杆菌联合疫苗（四联）', content: '3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫）。可预防百日咳、白喉、破伤风、b型流感嗜血杆菌感染（脑膜炎、肺炎等）四种疾病。' }
        ]
    },
    {
        age: '5月龄',
        planned: [],
        unplanned: [
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：2-5周岁；2-6月龄共3剂次，每间隔1或2月接种1次。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿，共4剂次（2、4、6月龄各接种1剂，12-15月龄加强1剂）。' },
            { name: '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）', content: '2月龄及以上婴幼儿，共4剂次（3、4、5、18月龄各接种1剂）。' },
            { name: '无细胞百白破b型流感嗜血杆菌联合疫苗（四联）', content: '3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫）。可预防百日咳、白喉、破伤风、b型流感嗜血杆菌感染（脑膜炎、肺炎等）四种疾病。' }
        ]
    },
    {
        age: '6月龄',
        planned: [
            { name: '乙肝疫苗', content: '预防乙型病毒性肝炎。重组乙型肝炎疫苗（酿酒酵母）：3剂次（出生时、1月龄、6月龄各接种1剂）。' },
            { name: '流脑A群疫苗', content: '预防A群脑膜炎球菌引起的流行性脑脊髓膜炎，降低出现听力损伤等严重后遗症的风险。A群脑膜炎球菌多糖疫苗：6月龄、9月龄各接种1剂，共2剂次。' }
        ],
        unplanned: [
            { name: '轮状病毒疫苗', content: '预防轮状病毒引起的婴幼儿腹泻。口服轮状病毒活疫苗：2月龄-3岁，每年接种1剂。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿，共4剂次（2、4、6月龄各接种1剂，12-15月龄加强1剂）。' },
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：6-12月龄3剂次（每间隔1或2月接种1次，共2次；在18月龄时进行加强接种1次）。' },
            { name: '手足口疫苗', content: '预防由肠道病毒71型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。肠道病毒71型灭活疫苗：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。' }
        ]
    },
    {
        age: '8月龄',
        planned: [
            { name: '麻腮风疫苗', content: '预防麻疹、流行性腮腺炎和风疹三种病毒感染。麻腮风联合减毒活疫苗：8月龄、18月龄各接种1剂，共2剂次。' },
            { name: '乙脑减毒疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎。乙型脑炎减毒活疫苗：8月龄儿童首次注射1次；于2岁再注射1次。' }
        ],
        unplanned: [
            { name: '轮状病毒疫苗', content: '预防轮状病毒引起的婴幼儿腹泻。口服轮状病毒活疫苗：2月龄-3岁，每年接种1剂。' },
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。' },
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：6-12月龄3剂次（每间隔1或2月接种1次，共2次；在18月龄时进行加强接种1次）。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）。' },
            { name: '手足口疫苗', content: '预防由肠道病毒71型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。肠道病毒71型灭活疫苗：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎。A群C群脑膜炎球菌多糖结合疫苗：3月龄~23月龄婴幼儿；3剂次（6~11月龄婴儿基础免疫2剂次，每剂间隔至少1个月，可在18月龄加强接种1剂）。ACYW135群脑膜炎球菌多糖结合疫苗：3月龄~3周岁儿童；2剂次（6~23月龄: 免疫2剂次,每剂次间隔1~3个月）。' }
        ]
    },
    {
        age: '9月龄',
        planned: [
            { name: '流脑A群疫苗', content: '预防A群脑膜炎球菌引起的流行性脑脊髓膜炎，降低出现听力损伤等严重后遗症的风险。A群脑膜炎球菌多糖疫苗：6月龄、9月龄各接种1剂，共2剂次。' }
        ],
        unplanned: [
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：6-12月龄3剂次（每间隔1或2月接种1次，共2次；在18月龄时进行加强接种1次）。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）。' },
            { name: '手足口疫苗', content: '预防由肠道病毒71型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。肠道病毒71型灭活疫苗：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎。A群C群脑膜炎球菌多糖结合疫苗：3月龄~23月龄婴幼儿；3剂次（6~11月龄婴儿基础免疫2剂次，每剂间隔至少1个月，可在18月龄加强接种1剂）。ACYW135群脑膜炎球菌多糖结合疫苗：3月龄~3周岁儿童；2剂次（6~23月龄: 免疫2剂次,每剂次间隔1~3个月）。' }
        ]
    },
    {
        age: '12月龄',
        planned: [],
        unplanned: [
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症。水痘减毒活疫苗：12月龄以上的易感者；1-12岁儿童基础免疫接种1剂。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿，共4剂次（2、4、6月龄各接种1剂，12-15月龄加强1剂）。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的感染性疾病。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '手足口疫苗', content: '预防由肠道病毒71型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。肠道病毒71型灭活疫苗：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；1或2剂次（6-35月龄儿童接种2剂次，间隔4周；≥3岁儿童及成人接种1剂次）。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎。A群C群脑膜炎球菌多糖结合疫苗：3月龄~23月龄婴幼儿；可在12月龄加强接种1剂。ACYW135群脑膜炎球菌多糖结合疫苗：3月龄~3周岁儿童；可在12月龄时加强注射1剂次。' }
        ]
    },
    {
        age: '18月龄',
        planned: [
            { name: '百白破疫苗', content: '同时预防百日咳、白喉、破伤风三种疾病。吸附无细胞百白破联合疫苗：2、4、6月龄各接种1剂次，18月龄和6岁各加强1剂次。' },
            { name: '麻腮风疫苗', content: '预防麻疹、流行性腮腺炎和风疹三种病毒感染。麻腮风联合减毒活疫苗：8月龄、18月龄各接种1剂，共2剂次。' },
            { name: '甲肝减毒疫苗', content: '预防甲型病毒性肝炎。甲型肝炎减毒活疫苗：18月龄接种1剂。' }
        ],
        unplanned: [
            { name: '甲肝灭活疫苗', content: '预防甲型病毒性肝炎。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。' },
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：18月龄进行加强接种1次。' },
            { name: '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）', content: '2月龄及以上婴幼儿，共4剂次（3、4、5、18月龄各接种1剂）。' },
            { name: '无细胞百白破b型流感嗜血杆菌联合疫苗（四联）', content: '3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫）。可预防百日咳、白喉、破伤风、b型流感嗜血杆菌感染（脑膜炎、肺炎等）四种疾病。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' }
        ]
    },
    {
        age: '2岁',
        planned: [
            { name: '乙脑减毒疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎。乙型脑炎减毒活疫苗：8月龄儿童首次注射1次；于2岁再注射1次。' }
        ],
        unplanned: [
            { name: '轮状病毒疫苗', content: '预防轮状病毒引起的婴幼儿腹泻。口服轮状病毒活疫苗：2月龄-3岁，每年接种1剂。' },
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。' },
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：2-5周岁；根据起始接种年龄不同，接种1-4剂次。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的感染性疾病。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症。水痘减毒活疫苗：12月龄以上的易感者；1-12岁儿童基础免疫接种1剂。' },
            { name: '手足口疫苗', content: '预防由肠道病毒71型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。肠道病毒71型灭活疫苗：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎。ACYW135群脑膜炎球菌多糖疫苗：2周岁以上的儿童及成人；初次接种1剂次。' },
            { name: '霍乱疫苗', content: '预防由霍乱弧菌引起的霍乱，减少剧烈呕吐、腹泻等症状及传播风险。重组B亚单位/菌体霍乱疫苗（肠溶胶囊）：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。' },
            { name: '乙脑疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎。乙型脑炎灭活疫苗（Vero细胞）：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。' }
        ]
    },
    {
        age: '3岁',
        planned: [
            { name: 'A群C群流脑多糖疫苗', content: '预防A群和C群脑膜炎球菌引起的流行性脑脊髓膜炎。A群C群脑膜炎球菌多糖疫苗：3周岁、6周岁各接种1剂，共2剂次。' }
        ],
        unplanned: [
            { name: '轮状病毒疫苗', content: '预防轮状病毒引起的婴幼儿腹泻。口服轮状病毒活疫苗：2月龄-3岁，每年接种1剂。' },
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。' },
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：2-5周岁；根据起始接种年龄不同，接种1-4剂次。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的感染性疾病。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症。水痘减毒活疫苗：12月龄以上的易感者；1-12岁儿童基础免疫接种1剂。' },
            { name: '手足口疫苗', content: '预防由肠道病毒71型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。肠道病毒71型灭活疫苗：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎。ACYW135群脑膜炎球菌多糖疫苗：2周岁以上的儿童及成人；初次接种1剂次。' },
            { name: '霍乱疫苗', content: '预防由霍乱弧菌引起的霍乱，减少剧烈呕吐、腹泻等症状及传播风险。重组B亚单位/菌体霍乱疫苗（肠溶胶囊）：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。' },
            { name: '乙脑疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎。乙型脑炎灭活疫苗（Vero细胞）：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。' }
        ]
    },
    {
        age: '4岁',
        planned: [
            { name: '脊灰减毒疫苗', content: '预防脊髓灰质炎（小儿麻痹症）。口服脊髓灰质炎减毒活疫苗（bOPV）：4月龄、4周岁各接种1剂，共2剂次。' }
        ],
        unplanned: [
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。' },
            { name: 'b型流感嗜血杆菌疫苗', content: '预防b型流感嗜血杆菌感染引起的严重疾病，包括脑膜炎、肺炎、败血症等。b型流感嗜血杆菌结合疫苗：2-5周岁；根据起始接种年龄不同，接种1-4剂次。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' },
            { name: '13价肺炎疫苗', content: '预防13种血清型肺炎球菌引起的感染性疾病。13价肺炎球菌多糖结合疫苗：6周龄至15月龄婴幼儿。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的感染性疾病。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症。水痘减毒活疫苗：12月龄以上的易感者；1-12岁儿童基础免疫接种1剂。' },
            { name: '手足口疫苗', content: '预防由肠道病毒71型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。肠道病毒71型灭活疫苗：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎。ACYW135群脑膜炎球菌多糖疫苗：2周岁以上的儿童及成人；初次接种1剂次。' },
            { name: '霍乱疫苗', content: '预防由霍乱弧菌引起的霍乱，减少剧烈呕吐、腹泻等症状及传播风险。重组B亚单位/菌体霍乱疫苗（肠溶胶囊）：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。' },
            { name: '乙脑疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎。乙型脑炎灭活疫苗（Vero细胞）：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。' }
        ]
    },
    {
        age: '6岁',
        planned: [
            { name: '百白破疫苗', content: '同时预防百日咳、白喉、破伤风三种疾病。吸附无细胞百白破联合疫苗：2、4、6月龄各接种1剂次，18月龄和6岁各加强1剂次。' },
            { name: 'A群C群流脑多糖疫苗', content: '预防A群和C群脑膜炎球菌引起的流行性脑脊髓膜炎。A群C群脑膜炎球菌多糖疫苗：3周岁、6周岁各接种1剂，共2剂次。' }
        ],
        unplanned: [
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的感染性疾病。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症。水痘减毒活疫苗：12月龄以上的易感者；1-12岁儿童基础免疫接种1剂。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎。ACYW135群脑膜炎球菌多糖疫苗：2周岁以上的儿童及成人；初次接种1剂次。' },
            { name: '霍乱疫苗', content: '预防由霍乱弧菌引起的霍乱，减少剧烈呕吐、腹泻等症状及传播风险。重组B亚单位/菌体霍乱疫苗（肠溶胶囊）：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。' },
            { name: '乙脑疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎。乙型脑炎灭活疫苗（Vero细胞）：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。' }
        ]
    },



    {
        age: '9岁',
        planned: [],
        unplanned: [
            { name: '流感疫苗', content: '预防流行性感冒。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的感染。' },
            { name: '水痘疫苗', content: '预防水痘。' },
            { name: 'HPV疫苗', content: '预防人乳头瘤病毒感染。' },
            { name: '流脑疫苗', content: '预防流行性脑脊髓膜炎。' },
            { name: '霍乱疫苗', content: '预防霍乱。' },
            { name: '乙脑疫苗', content: '预防流行性乙型脑炎。' }
        ]
    },
    {
        age: '13岁',
        planned: [
            { name: '二价HPV疫苗', content: '预防高危型人乳头瘤病毒（HPV16型和18型）引起的宫颈癌、阴道癌等癌症及癌前病变。双价人乳头瘤病毒疫苗：根据国家免疫规划程序，建议满13周岁女孩接种2剂次，间隔6个月。' }
        ],
        unplanned: [
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。甲型乙型肝炎联合疫苗：儿童剂型适用于1-15岁婴幼儿和少年，成人剂型适用于16岁及以上青少年和成人；基础免疫3剂次。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的肺炎、脑膜炎、败血症等感染性疾病，尤其保护老年人和高危人群。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症（如皮肤感染、脑炎），同时降低成年后带状疱疹发病风险。水痘减毒活疫苗：12月龄以上的易感者；13岁及以上人群基础免疫接种2剂，间隔4-8周。' },
            { name: 'HPV疫苗', content: 'HPV疫苗能够预防高危型HPV的持续感染，有效降低宫颈癌、肛门癌、生殖器疣等相关疾病的风险。双价人乳头瘤病毒疫苗：9-45岁女性，3剂次（于0、1和6月分别接种1剂次。）九价人乳头瘤病毒疫苗（酿酒酵母）：9-45岁女性和16-26岁男性，2或3剂次。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。ACYW135群脑膜炎球菌多糖疫苗：2周岁以上的儿童及成人；初次接种1剂次。' },
            { name: '霍乱疫苗', content: '预防由霍乱弧菌引起的霍乱，减少剧烈呕吐、腹泻等症状及传播风险。重组B亚单位/菌体霍乱疫苗（肠溶胶囊）：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。' },
            { name: '乙脑疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。乙型脑炎灭活疫苗（Vero细胞）：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。' }
        ]
    },
    {
        age: '16岁',
        planned: [],
        unplanned: [
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。甲型乙型肝炎联合疫苗：儿童剂型适用于1-15岁婴幼儿和少年，成人剂型适用于16岁及以上青少年和成人；基础免疫3剂次。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的肺炎、脑膜炎、败血症等感染性疾病，尤其保护老年人和高危人群。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症（如皮肤感染、脑炎），同时降低成年后带状疱疹发病风险。水痘减毒活疫苗：12月龄以上的易感者；13岁及以上人群基础免疫接种2剂，间隔4-8周。' },
            { name: 'HPV疫苗', content: 'HPV疫苗能够预防高危型HPV的持续感染，有效降低宫颈癌、肛门癌、生殖器疣等相关疾病的风险。双价人乳头瘤病毒疫苗：9-45岁女性，3剂次（于0、1和6月分别接种1剂次。）九价人乳头瘤病毒疫苗（酿酒酵母）：9-45岁女性和16-26岁男性，2或3剂次。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。ACYW135群脑膜炎球菌多糖疫苗：2周岁以上的儿童及成人；初次接种1剂次。' },
            { name: '戊肝疫苗', content: '预防戊型肝炎病毒感染引起的戊型肝炎。重组戊型肝炎疫苗：16岁及以上易感人群；3剂次（按照0、1、6月接种方案进行接种）。' },
            { name: '霍乱疫苗', content: '预防由霍乱弧菌引起的霍乱，减少剧烈呕吐、腹泻等症状及传播风险。重组B亚单位/菌体霍乱疫苗（肠溶胶囊）：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。' },
            { name: '乙脑疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。乙型脑炎灭活疫苗（Vero细胞）：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。' }
        ]
    },
    {
        age: '≥40岁',
        planned: [],
        unplanned: [
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。甲型乙型肝炎联合疫苗：成人剂型适用于16岁及以上青少年和成人；基础免疫3剂次。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的肺炎、脑膜炎、败血症等感染性疾病，尤其保护老年人和高危人群。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症（如皮肤感染、脑炎），同时降低成年后带状疱疹发病风险。水痘减毒活疫苗：12月龄以上的易感者；13岁及以上人群基础免疫接种2剂，间隔4-8周。' },
            { name: 'HPV疫苗', content: 'HPV疫苗能够预防高危型HPV的持续感染，有效降低宫颈癌、肛门癌、生殖器疣等相关疾病的风险。双价人乳头瘤病毒疫苗：9-45岁女性，3剂次（于0、1和6月分别接种1剂次。）九价人乳头瘤病毒疫苗（酿酒酵母）：9-45岁女性和16-26岁男性，2或3剂次。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。ACYW135群脑膜炎球菌多糖疫苗：2周岁以上的儿童及成人；初次接种1剂次。' },
            { name: '带状疱疹疫苗', content: '预防带状疱疹，降低带状疱疹引起的神经痛等并发症风险。重组带状疱疹疫苗（CHO细胞）：50岁及以上成人；2剂次（间隔2个月接种，第2剂在第1剂后2-6个月之间接种）。' },
            { name: '戊肝疫苗', content: '预防戊型肝炎病毒感染引起的戊型肝炎。重组戊型肝炎疫苗：16岁及以上易感人群；3剂次（按照0、1、6月接种方案进行接种）。' },
            { name: '霍乱疫苗', content: '预防由霍乱弧菌引起的霍乱，减少剧烈呕吐、腹泻等症状及传播风险。重组B亚单位/菌体霍乱疫苗（肠溶胶囊）：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。' },
            { name: '乙脑疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。乙型脑炎灭活疫苗（Vero细胞）：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。' }
        ]
    },
    {
        age: '≥50岁',
        planned: [],
        unplanned: [
            { name: '甲肝疫苗', content: '预防甲型病毒性肝炎。冻干甲型肝炎减毒活疫苗：1岁以上甲型肝炎易感者；1剂次。甲型肝炎灭活疫苗：1岁以上甲型肝炎易感者；2剂次，间隔6个月。甲型乙型肝炎联合疫苗：成人剂型适用于16岁及以上青少年和成人；基础免疫3剂次。' },
            { name: '流感疫苗', content: '预防甲型、乙型流感病毒感染，降低流感的发病率，减少因流感引发的肺炎、心肌炎等并发症。三价、四价流感病毒裂解疫苗：≥6月龄人群；≥3岁儿童及成人接种1剂次。' },
            { name: '23价肺炎疫苗', content: '预防23种血清型肺炎球菌引起的肺炎、脑膜炎、败血症等感染性疾病，尤其保护老年人和高危人群。23价肺炎球菌多糖疫苗：2岁以上易感人群，1剂次。' },
            { name: '水痘疫苗', content: '预防水痘-带状疱疹病毒感染，减少水痘发病及并发症（如皮肤感染、脑炎），同时降低成年后带状疱疹发病风险。水痘减毒活疫苗：12月龄以上的易感者；13岁及以上人群基础免疫接种2剂，间隔4-8周。' },
            { name: '流脑疫苗', content: '预防脑膜炎奈瑟菌引起的流行性脑脊髓膜炎（流脑），减轻高热、头痛、皮肤瘀斑、脑膜刺激征等症状，降低重症死亡率。ACYW135群脑膜炎球菌多糖疫苗：2周岁以上的儿童及成人；初次接种1剂次。' },
            { name: '带状疱疹疫苗', content: '预防带状疱疹，降低带状疱疹引起的神经痛等并发症风险。重组带状疱疹疫苗（CHO细胞）：50岁及以上成人；2剂次（间隔2个月接种，第2剂在第1剂后2-6个月之间接种）。' },
            { name: '戊肝疫苗', content: '预防戊型肝炎病毒感染引起的戊型肝炎。重组戊型肝炎疫苗：16岁及以上易感人群；3剂次（按照0、1、6月接种方案进行接种）。' },
            { name: '霍乱疫苗', content: '预防由霍乱弧菌引起的霍乱，减少剧烈呕吐、腹泻等症状及传播风险。重组B亚单位/菌体霍乱疫苗（肠溶胶囊）：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。' },
            { name: '乙脑疫苗', content: '预防乙型脑炎病毒感染引起的乙型脑炎（乙脑），避免病毒侵犯中枢神经系统导致高热、抽搐、昏迷，降低致残率和死亡率。乙型脑炎灭活疫苗（Vero细胞）：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。' }
        ]
    }
];

const vaccineDetails = {
    '乙肝疫苗': {
        purpose: '预防乙型病毒性肝炎。',
        detail: `<p><strong>重组乙型肝炎疫苗（酿酒酵母）</strong>：接种对象为乙肝易感者，3剂次（出生时、1月龄、6月龄各接种1剂）。</p>
        <p><strong>重组乙型肝炎疫苗（CHO细胞）</strong>：接种对象为乙肝易感者，3剂次（出生时、1月龄、6月龄各接种1剂）。</p>`
    },
    '卡介苗': {
        purpose: '预防结核病。',
        detail: `<p><strong>皮内注射用卡介苗</strong>：出生后24小时内接种，1剂次。</p>`
    },
    '脊灰灭活疫苗': {
        purpose: '预防脊髓灰质炎（小儿麻痹症）。',
        detail: `<p><strong>脊髓灰质炎灭活疫苗（IPV）</strong>：2月龄、3月龄各接种1剂，共2剂次。</p>`
    },
    '脊灰减毒疫苗': {
        purpose: '预防脊髓灰质炎（小儿麻痹症）。',
        detail: `<p><strong>口服脊髓灰质炎减毒活疫苗（bOPV）</strong>：4月龄、4周岁各接种1剂，共2剂次。</p>`
    },
    '百白破疫苗': {
        purpose: '预防百日咳、白喉、破伤风。',
        detail: `<p><strong>吸附无细胞百白破联合疫苗</strong>：3月龄、4月龄、5月龄、18月龄各接种1剂，共4剂次。</p>`
    },
    '麻腮风疫苗': {
        purpose: '预防麻疹、流行性腮腺炎、风疹。',
        detail: `<p><strong>麻疹腮腺炎风疹联合减毒活疫苗</strong>：8月龄、18月龄各接种1剂，共2剂次。</p>`
    },
    '乙脑减毒疫苗': {
        purpose: '预防流行性乙型脑炎。',
        detail: `<p><strong>乙型脑炎减毒活疫苗</strong>：8月龄、2周岁各接种1剂，共2剂次。</p>`
    },
    '流脑A群疫苗': {
        purpose: '预防A群脑膜炎球菌引起的流行性脑脊髓膜炎。',
        detail: `<p><strong>A群脑膜炎球菌多糖疫苗</strong>：6月龄、9月龄各接种1剂，共2剂次。</p>`
    },
    'A群C群流脑多糖疫苗': {
        purpose: '预防A群和C群脑膜炎球菌引起的流行性脑脊髓膜炎。',
        detail: `<p><strong>A群C群脑膜炎球菌多糖疫苗</strong>：3周岁、6周岁各接种1剂，共2剂次。</p>`
    },
    '甲肝减毒疫苗': {
        purpose: '预防甲型病毒性肝炎。',
        detail: `<p><strong>甲型肝炎减毒活疫苗</strong>：18月龄接种1剂。</p>`
    },
    '甲肝疫苗': {
        purpose: '预防甲型病毒性肝炎。',
        detail: `<p><strong>冻干甲型肝炎减毒活疫苗</strong>：1岁以上甲型肝炎易感者；1剂次。</p>
        <p><strong>甲型肝炎灭活疫苗</strong>：1岁以上甲型肝炎易感者；2剂次，间隔6个月。</p>`
    },
    '轮状病毒疫苗': {
        purpose: '预防轮状病毒引起的婴幼儿腹泻。',
        detail: `<p><strong>口服轮状病毒活疫苗</strong>：2月龄至3周岁婴幼儿，每年接种1剂。</p>
        <p><strong>口服五价重配轮状病毒减毒活疫苗（Vero细胞）</strong>：6周至32周龄婴儿，共3剂次。</p>`
    },
    'b型流感嗜血杆菌疫苗': {
        purpose: '预防b型流感嗜血杆菌引起的侵袭性疾病（如脑膜炎、肺炎）。',
        detail: `<p><strong>b型流感嗜血杆菌结合疫苗</strong>：2月龄至5周岁儿童，根据起始接种年龄不同，接种1-4剂次。</p>`
    },
    '流感疫苗': {
        purpose: '预防流行性感冒。',
        detail: `<p><strong>三价、四价流感病毒裂解疫苗</strong>：≥6月龄人群；≥3岁儿童及成人接种1剂次。</p>`
    },
    '13价肺炎疫苗': {
        purpose: '预防13种血清型肺炎球菌引起的感染性疾病。',
        detail: `<p><strong>13价肺炎球菌多糖结合疫苗</strong>：6周龄至15月龄婴幼儿，共4剂次（2、4、6月龄各接种1剂，12-15月龄加强1剂）。</p>`
    },
    '23价肺炎疫苗': {
        purpose: '预防23种血清型肺炎球菌引起的感染性疾病。',
        detail: `<p><strong>23价肺炎球菌多糖疫苗</strong>：2岁以上易感人群，1剂次。</p>`
    },
    '水痘疫苗': {
        purpose: '预防水痘-带状疱疹病毒感染。',
        detail: `<p><strong>水痘减毒活疫苗</strong>：12月龄以上的易感者；13岁及以上人群基础免疫接种2剂，间隔4-8周。</p>`
    },
    '手足口疫苗': {
        purpose: '预防由肠道病毒71型引起的手足口病（重点降低重症风险，如脑炎、肺水肿）。',
        detail: `<p><strong>肠道病毒71型灭活疫苗</strong>：6月龄至71月龄易感者；基础免疫程序为2剂次，间隔1个月。</p>`
    },
    '二价HPV疫苗': {
        purpose: '预防高危型人乳头瘤病毒（HPV16型和18型）引起的宫颈癌、阴道癌等癌症及癌前病变。',
        detail: `<p><strong>双价人乳头瘤病毒疫苗</strong>：根据国家免疫规划程序，建议满13周岁女孩接种2剂次，间隔6个月。</p>`
    },
    '流脑疫苗': {
        purpose: '预防流行性脑脊髓膜炎。',
        detail: `<p><strong>ACYW135群脑膜炎球菌多糖疫苗</strong>：2周岁以上的儿童及成人；初次接种1剂次。</p>`
    },
    '霍乱疫苗': {
        purpose: '预防霍乱。',
        detail: `<p><strong>重组B亚单位/菌体霍乱疫苗（肠溶胶囊）</strong>：2岁或2岁以上的儿童，青少年和有接触或传播危险的成人，3剂次。</p>`
    },
    '乙脑疫苗': {
        purpose: '预防流行性乙型脑炎。',
        detail: `<p><strong>乙型脑炎灭活疫苗（Vero细胞）</strong>：6个月至10周岁儿童和由非疫区有可能进入疫区的儿童和成人；3剂次。</p>`
    },
    '无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌联合疫苗（五联）': {
        purpose: '同时预防百日咳、白喉、破伤风、脊髓灰质炎和b型流感嗜血杆菌引起的感染。',
        detail: `<p><strong>吸附无细胞百白破灭活脊髓灰质炎和b型流感嗜血杆菌（结合）联合疫苗</strong>：2月龄及以上婴幼儿，共4剂次（3、4、5、18月龄各接种1剂）。</p>`
    },
    '无细胞百白破b型流感嗜血杆菌联合疫苗（四联）': {
        purpose: '可预防百日咳、白喉、破伤风、b型流感嗜血杆菌感染（脑膜炎、肺炎等）四种疾病。',
        detail: `<p><strong>无细胞百白破b型流感嗜血杆菌联合疫苗</strong>：3月龄以上婴幼儿；4剂次（3、4、5月龄进行基础免疫，18~24月龄加强免疫）。</p>`
    },
    '脊髓灰质炎疫苗': {
        purpose: '预防脊髓灰质炎（小儿麻痹症）。',
        detail: `<p><strong>脊髓灰质炎灭活疫苗（IPV）</strong>：2月龄、3月龄各接种1剂。</p>
        <p><strong>口服脊髓灰质炎减毒活疫苗（bOPV）</strong>：4月龄、4周岁各接种1剂。</p>`
    },
    '甲肝灭活疫苗': {
        purpose: '预防甲型病毒性肝炎。',
        detail: `<p><strong>甲型肝炎灭活疫苗</strong>：1岁以上甲型肝炎易感者；2剂次，间隔6个月。</p>`
    },
    'HPV疫苗': {
        purpose: '预防人乳头瘤病毒感染引起的相关疾病。',
        detail: `<p><strong>双价人乳头瘤病毒疫苗</strong>：9-45岁女性，3剂次（于0、1和6月分别接种1剂次）。</p>
        <p><strong>四价人乳头瘤病毒疫苗</strong>：9-45岁女性，3剂次（于0、2和6月分别接种1剂次）。</p>
        <p><strong>九价人乳头瘤病毒疫苗</strong>：9-45岁女性和16-26岁男性，3剂次（于0、2和6月分别接种1剂次）。</p>`
    },
    '带状疱疹疫苗': {
        purpose: '预防带状疱疹及其并发症。',
        detail: `<p><strong>重组带状疱疹疫苗（CHO细胞）</strong>：50岁及以上成人；2剂次（间隔2个月接种，第2剂在第1剂后2-6个月之间接种）。</p>`
    },
    '戊肝疫苗': {
        purpose: '预防戊型病毒性肝炎。',
        detail: `<p><strong>重组戊型肝炎疫苗</strong>：16岁及以上易感人群；3剂次（按照0、1、6月接种方案进行接种）。</p>`
    }
};

const ORIGINAL_WIDTH = 2160;
const ORIGINAL_HEIGHT = 3840;
const ASPECT_RATIO = ORIGINAL_WIDTH / ORIGINAL_HEIGHT;

let cachedViewportHeight = null;
let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
             (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function getDisplaySize() {
    const screenWidth = document.documentElement.clientWidth;
    let screenHeight;
    
    if (isIOS) {
        if (!cachedViewportHeight) {
            cachedViewportHeight = window.innerHeight;
        }
        screenHeight = cachedViewportHeight;
    } else {
        screenHeight = document.documentElement.clientHeight;
    }
    
    let displayWidth, displayHeight;
    
    if (screenWidth / screenHeight > ASPECT_RATIO) {
        displayHeight = screenHeight;
        displayWidth = displayHeight * ASPECT_RATIO;
    } else {
        displayWidth = screenWidth;
        displayHeight = displayWidth / ASPECT_RATIO;
    }
    
    return { displayWidth, displayHeight, screenWidth, screenHeight };
}

function getScaleRatio() {
    const { displayWidth } = getDisplaySize();
    return displayWidth / ORIGINAL_WIDTH;
}

function getLengthClass(name) {
    const length = name.length;
    if (length <= 5) {
        return 'short';
    }
    return '';
}

function updateScale() {
    const { displayWidth, displayHeight, screenWidth, screenHeight } = getDisplaySize();
    const scaleRatio = getScaleRatio();
    
    const container = document.getElementById('timelineContainer');
    const pinkBg = document.querySelector('.pink-bg');
    const pinkTop = document.querySelector('.pink-top');
    const pinkBottom = document.querySelector('.pink-bottom');
    
    if (container) {
        container.style.width = `${ORIGINAL_WIDTH}px`;
        container.style.height = `${ORIGINAL_HEIGHT}px`;
        container.style.transform = `translateX(-50%) scale(${scaleRatio})`;
        container.style.transformOrigin = 'top center';
    }
    
    if (pinkBg) {
        pinkBg.style.width = `${ORIGINAL_WIDTH}px`;
        pinkBg.style.height = `${ORIGINAL_HEIGHT}px`;
        pinkBg.style.transform = `translateX(-50%) scale(${scaleRatio})`;
        pinkBg.style.transformOrigin = 'top center';
    }
    
    if (pinkTop) {
        pinkTop.style.width = `${ORIGINAL_WIDTH}px`;
        pinkTop.style.height = `${ORIGINAL_HEIGHT}px`;
        pinkTop.style.transform = `translateX(-50%) scale(${scaleRatio})`;
        pinkTop.style.transformOrigin = 'top center';
    }
    
    if (pinkBottom) {
        pinkBottom.style.width = `${ORIGINAL_WIDTH}px`;
        pinkBottom.style.height = `${ORIGINAL_HEIGHT}px`;
        pinkBottom.style.transform = `translateX(-50%) scale(${scaleRatio})`;
        pinkBottom.style.transformOrigin = 'bottom center';
    }
    
    // 更新人物SVG缩放
    updateCharactersScale(scaleRatio);
    
    // 更新页面标题缩放
    updatePageTitleScale(scaleRatio);
}

// 更新人物SVG缩放
function updateCharactersScale(scaleRatio) {
    const container = document.getElementById('characterImages');
    if (container) {
        container.style.transform = `translateX(-50%) scale(${scaleRatio})`;
        container.style.transformOrigin = 'top center';
    }
}

// 更新页面标题缩放
function updatePageTitleScale(scaleRatio) {
    const pageTitle = document.getElementById('page-title');
    if (pageTitle) {
        const img = pageTitle.querySelector('img');
        if (img) {
            // 原始宽度 1228.27px，根据缩放比例调整
            img.style.width = `${1228.27 * scaleRatio}px`;
        }
    }
}

// 根据滚动位置更新显示的人物
function updateVisibleCharacter() {
    const timelineBody = document.getElementById('timelineBody');
    const characterImgs = document.querySelectorAll('.character-img');
    
    if (!timelineBody || characterImgs.length === 0) return;
    
    const scrollTop = timelineBody.scrollTop;
    const scrollHeight = timelineBody.scrollHeight;
    const clientHeight = timelineBody.clientHeight;
    
    // 计算滚动百分比 (0-1)，0是在顶部（老人），1是在底部（婴儿）
    const scrollPercent = scrollTop / (scrollHeight - clientHeight);
    
    // 定义每个人物显示的滚动范围（无重叠）
    // 时间线是从下往上：婴儿(出生时)在最下面，老人(≥50岁)在最上面
    // 滚动0%时在顶部显示老人，滚动100%时在底部显示婴儿
    const ranges = [
        { img: characterImgs[3], min: 0.00, max: 0.2 },   // 老人 - ≥50岁（最上面）
        { img: characterImgs[2], min: 0.2, max: 0.45 },   // 大人 - 18岁
        { img: characterImgs[1], min: 0.45, max: 0.7 },   // 小孩 - 4岁
        { img: characterImgs[0], min: 0.7, max: 1.00 }    // 婴儿 - 出生时（最下面）
    ];
    
    ranges.forEach(({ img, min, max }) => {
        if (scrollPercent >= min && scrollPercent < max) {
            img.classList.add('visible');
        } else {
            img.classList.remove('visible');
        }
    });
}

function renderTimeline() {
    const timelineBody = document.getElementById('timelineBody');
    
    const axisDiv = document.createElement('div');
    axisDiv.className = 'timeline-axis';
    timelineBody.appendChild(axisDiv);
    
    // 反转数组，让年龄大的在上面，年龄小的在下面
    const reversedData = [...vaccineTimelineData].reverse();
    
    reversedData.forEach((item, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'timeline-item';
        
        const ageDiv = document.createElement('div');
        ageDiv.className = 'timeline-age';
        ageDiv.textContent = item.age;
        itemDiv.appendChild(ageDiv);
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'timeline-content';
        
        const leftColumn = document.createElement('div');
        leftColumn.className = 'vaccine-column left';
        
        const leftList = document.createElement('div');
        leftList.className = 'vaccine-list';
        
        if (item.planned.length > 0) {
            item.planned.forEach(vaccine => {
                const vaccineItem = document.createElement('div');
                const lengthClass = getLengthClass(vaccine.name);
                vaccineItem.className = `vaccine-item planned ${lengthClass}`;
                vaccineItem.textContent = vaccine.name;
                vaccineItem.addEventListener('click', () => showVaccineDetail(vaccine.name, 'planned'));
                leftList.appendChild(vaccineItem);
            });
        } else {
            const noVaccine = document.createElement('div');
            noVaccine.className = 'no-vaccine';
            noVaccine.textContent = '暂无';
            leftList.appendChild(noVaccine);
        }
        leftColumn.appendChild(leftList);
        
        const rightColumn = document.createElement('div');
        rightColumn.className = 'vaccine-column right';
        
        const rightList = document.createElement('div');
        rightList.className = 'vaccine-list';
        
        if (item.unplanned.length > 0) {
            item.unplanned.forEach(vaccine => {
                const vaccineItem = document.createElement('div');
                const lengthClass = getLengthClass(vaccine.name);
                vaccineItem.className = `vaccine-item unplanned ${lengthClass}`;
                vaccineItem.textContent = vaccine.name;
                vaccineItem.addEventListener('click', () => showVaccineDetail(vaccine.name, 'unplanned'));
                rightList.appendChild(vaccineItem);
            });
        } else {
            const noVaccine = document.createElement('div');
            noVaccine.className = 'no-vaccine';
            noVaccine.textContent = '暂无';
            rightList.appendChild(noVaccine);
        }
        rightColumn.appendChild(rightList);
        
        contentDiv.appendChild(leftColumn);
        contentDiv.appendChild(rightColumn);
        itemDiv.appendChild(contentDiv);
        
        timelineBody.appendChild(itemDiv);
    });
}

function showVaccineDetail(vaccineName, type) {
    const modal = document.getElementById('vaccineModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = vaccineName;
    
    const detail = vaccineDetails[vaccineName] || {
        purpose: '暂无详细信息',
        detail: '<p>暂无详细信息</p>'
    };
    
    modalBody.innerHTML = `
        <div class="vaccine-section">
            <h4>${vaccineName}</h4>
            <p class="vaccine-purpose">${detail.purpose}</p>
            <div class="vaccine-detail">
                ${detail.detail}
            </div>
        </div>
    `;
    
    modal.classList.add('active');
    
    // 模态框打开时隐藏返回区域
    const backArea = document.querySelector('.back-area');
    if (backArea) {
        backArea.style.display = 'none';
    }
}

function closeModal() {
    const modal = document.getElementById('vaccineModal');
    modal.classList.remove('active');
    
    // 模态框关闭时显示返回区域
    const backArea = document.querySelector('.back-area');
    if (backArea) {
        backArea.style.display = 'block';
    }
}

// 二级页面前景 Lottie 动画
let maskLottieAnimation = null;
let maskLayer = null;

// 初始化二级页面前景 Lottie 动画
function initMaskLottie() {
    maskLayer = document.getElementById('mask-lottie');
    if (maskLottieAnimation || !maskLayer) return;
    
    // 设置尺寸为设计稿尺寸
    maskLayer.style.width = `${ORIGINAL_WIDTH}px`;
    maskLayer.style.height = `${ORIGINAL_HEIGHT}px`;
    
    // 动态导入 LottieAnimation 类
    import('./components/LottieAnimation.js').then(module => {
        const { LottieAnimation } = module;
        
        maskLottieAnimation = new LottieAnimation({
            container: maskLayer,
            path: '/二级页面前景2.json',
            loop: true,
            autoplay: false,
            renderer: 'svg'
        });
        
        // 显示并播放动画
        maskLayer.classList.add('visible');
        if (maskLottieAnimation && maskLottieAnimation.animation) {
            maskLottieAnimation.animation.play();
        }
    });
}

// 更新前景层缩放
function updateMaskLottieScale() {
    if (!maskLayer) return;
    
    const scaleRatio = getScaleRatio();
    maskLayer.style.transform = `translateX(-50%) scale(${scaleRatio})`;
    maskLayer.style.transformOrigin = 'top center';
}

// 滚动到指定年龄
function scrollToAge(targetAge) {
    const timelineBody = document.getElementById('timelineBody');
    const ageElements = timelineBody.querySelectorAll('.timeline-age');
    
    for (const ageEl of ageElements) {
        if (ageEl.textContent.trim() === targetAge) {
            // 找到对应的timeline-item
            const timelineItem = ageEl.closest('.timeline-item');
            if (timelineItem) {
                // 计算滚动位置，使目标年龄显示在可视区域中间偏上的位置
                const itemTop = timelineItem.offsetTop;
                const containerHeight = timelineBody.clientHeight;
                const scrollPosition = itemTop - containerHeight / 3;
                
                timelineBody.scrollTo({
                    top: Math.max(0, scrollPosition),
                    behavior: 'smooth'
                });
            }
            break;
        }
    }
}

// 获取URL参数
function getUrlParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

function setRootFontSize() {
    const width = window.innerWidth;
    document.documentElement.style.fontSize = (width / 375) + 'px';
}

document.addEventListener('DOMContentLoaded', () => {
    setRootFontSize();
    
    document.body.addEventListener('touchmove', function(e) {
        if (e.target.closest('.timeline-body') || e.target.closest('.modal-body')) {
            return;
        }
        e.preventDefault();
    }, { passive: false });
    
    renderTimeline();
    updateScale();
    
    // 初始化二级页面前景动画
    initMaskLottie();
    updateMaskLottieScale();
    
    // 初始化人物SVG缩放
    const scaleRatio = getScaleRatio();
    updateCharactersScale(scaleRatio);
    
    // 初始化页面标题缩放
    updatePageTitleScale(scaleRatio);
    
    // 检查是否有目标年龄参数，有则滚动到对应位置
    const targetAge = getUrlParam('age');
    if (targetAge) {
        // 延迟一点执行滚动，确保页面已渲染完成
        setTimeout(() => {
            scrollToAge(targetAge);
        }, 300);
    }
    
    let resizeTimeout;
    let lastScreenWidth = window.innerWidth;
    let lastScreenHeight = window.innerHeight;
    
    window.addEventListener('resize', () => {
        const currentScreenWidth = window.innerWidth;
        const currentScreenHeight = window.innerHeight;
        
        const widthChanged = Math.abs(currentScreenWidth - lastScreenWidth) > 10;
        const heightChanged = Math.abs(currentScreenHeight - lastScreenHeight) > 50;
        
        if (!widthChanged && !heightChanged) {
            return;
        }
        
        lastScreenWidth = currentScreenWidth;
        lastScreenHeight = currentScreenHeight;
        
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (!isIOS || widthChanged) {
                cachedViewportHeight = null;
            }
            setRootFontSize();
            updateScale();
            updateMaskLottieScale();
        }, 150);
    });
    
    const modalClose = document.getElementById('modalClose');
    const modalBackdrop = document.querySelector('.modal-backdrop');
    const timelineBody = document.getElementById('timelineBody');
    
    modalClose.addEventListener('click', closeModal);
    modalBackdrop.addEventListener('click', closeModal);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // 监听滚动事件，更新显示的人物
    if (timelineBody) {
        timelineBody.addEventListener('scroll', () => {
            updateVisibleCharacter();
        });
        // 初始化显示
        updateVisibleCharacter();
    }
    
    // 右滑返回主页面
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let touchEndY = 0;
    
    // 使用普通的冒泡阶段监听，避免拦截其他元素的事件
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }, { passive: true });
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        touchEndY = e.changedTouches[0].screenY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = Math.abs(touchEndY - touchStartY);
        
        // 右滑超过100像素且水平滑动明显大于垂直滑动时返回
        if (diffX > 100 && diffX > diffY * 1.2) {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'index.html';
            }
        }
    }, { passive: true });
    
    // 鼠标右滑返回（用于桌面端测试）
    let mouseDownX = 0;
    let mouseDownY = 0;
    
    document.addEventListener('mousedown', (e) => {
        mouseDownX = e.screenX;
        mouseDownY = e.screenY;
    });
    
    document.addEventListener('mouseup', (e) => {
        const diffX = e.screenX - mouseDownX;
        const diffY = Math.abs(e.screenY - mouseDownY);
        
        if (diffX > 100 && diffX > diffY * 1.2) {
            window.location.href = 'index.html';
        }
    });
    
    // 点击右上角区域返回主页面
    const backArea = document.createElement('div');
    backArea.className = 'back-area';
    backArea.innerHTML = '<img src="/叉.svg" style="width: 120px; height: 120px; position: absolute; top: 75px; right: 89px; z-index: 9999;">';
    backArea.style.zIndex = '9999';
    backArea.addEventListener('click', () => {
        window.location.href = 'index.html';
    });
    document.body.appendChild(backArea);
});
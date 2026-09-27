const utils = require('./index')

describe('[Görev 1] nesneyiTrimle', () => {
  test('[1] tüm string propları trimler ve asıl nesneyi değiştirmez', () => {
    const input = { foo: '  foo ', bar: 'bar ', baz: ' baz' }
    const expected = { foo: 'foo', bar: 'bar', baz: 'baz' }
    const actual = utils.nesneyiTrimle(input)
    expect(actual).toEqual(expected)
    expect(actual).not.toBe(input)
    expect(input.foo).toBe('  foo ')
  })
})

describe('[Görev 2] verileniTrimle', () => {
  test('[2] yalnızca istenen string propu trimler', () => {
    const input = { isim: '  jane  ', yas: ' 34 ' }
    expect(utils.verileniTrimle(input, 'isim')).toEqual({ isim: 'jane', yas: ' 34 ' })
    expect(input.isim).toBe('  jane  ')
  })

  test('[3] seçili prop string değilse değerini değiştirmez', () => {
    const input = { yas: 34 }
    expect(utils.verileniTrimle(input, 'yas')).toEqual({ yas: 34 })
  })
})

describe('[Görev 3] enBuyukTamsayiyiBul', () => {
  test('[4] nesne dizisindeki en büyük tamsayıyı döndürür', () => {
    expect(utils.enBuyukTamsayiyiBul([{ tamsayi: 1 }, { tamsayi: 3 }, { tamsayi: 2 }])).toBe(3)
  })
})

describe('[Görev 4] Sayici', () => {
  let sayici
  beforeEach(() => {
    sayici = new utils.Sayici(3) // her test yeni bir sayı ile başlatılıyor
  })
  test('[5] ilk çağrıda başlangıç değerini döndürür', () => {
    expect(sayici.asagiSay()).toBe(3)
  })

  test('[6] sonraki çağrıda bir azaltır', () => {
    sayici.asagiSay()
    expect(sayici.asagiSay()).toBe(2)
  })

  test('[7] sıfıra ulaşınca daha aşağı saymaz', () => {
    for (let i = 0; i < 5; i += 1) sayici.asagiSay()
    expect(sayici.asagiSay()).toBe(0)
  })
})

describe('[Görev 5] Mevsimler', () => {
  let mevsimler
  beforeEach(() => {
    mevsimler = new utils.Mevsimler() // her test yeni bir mevsimle başlar
  })
  test('[8-13] mevsimleri sırayla döndürür ve döngüyü tekrarlar', () => {
    expect(Array.from({ length: 5 }, () => mevsimler.sonraki())).toEqual([
      'yaz', 'sonbahar', 'kış', 'ilkbahar', 'yaz',
    ])
  })

  test('[14] kırkıncı çağrıda ilkbaharı döndürür', () => {
    let mevsim
    for (let i = 0; i < 40; i += 1) mevsim = mevsimler.sonraki()
    expect(mevsim).toBe('ilkbahar')
  })
})

describe('[Görev 6] Araba', () => {
  let focus
  beforeEach(() => {
    focus = new utils.Araba('focus', 20, 30) // her test yeni bir araba oluşturur
  })
  test('[15] arabayı sürünce odometreyi günceller', () => {
    expect(focus.sur(100)).toBe(100)
    expect(focus.sur(100)).toBe(200)
  })

  test('[16] sürüş mesafesine göre benzin tüketir', () => {
    focus.sur(300)
    expect(focus.depo).toBe(10)
  })

  test('[17] benzin alınca kalan sürüş menzili artar', () => {
    focus.sur(600)
    expect(focus.benzinal(10)).toBe(900)
    expect(focus.sur(300)).toBe(900)
  })

  test('[18] depo doluyken fazla benzin eklenmez ve menzil aşılmaz', () => {
    expect(focus.benzinal(99)).toBe(600)
    expect(focus.sur(700)).toBe(600)
  })
})

describe('[Görev 7] asenkronCiftSayi', () => {
  test('[19] çift sayı için true çözümler', async () => {
    await expect(utils.asenkronCiftSayi(2)).resolves.toBe(true)
  })

  test('[20] tek sayı için false çözümler', async () => {
    await expect(utils.asenkronCiftSayi(3)).resolves.toBe(false)
  })
})

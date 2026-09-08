export const metadata = {
  title: "利用規約 | Mentora",
  description:
    "Mentoraの利用条件を定めた利用規約です。",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-medium text-slate-500">
            Mentora
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            利用規約
          </h1>

          <p className="text-sm leading-7 text-slate-600">
            この利用規約（以下「本規約」といいます。）は、
            合同会社Webuild（以下「当社」といいます。）が提供する
            Mentora（以下「本サービス」といいます。）の利用条件を定めるものです。
          </p>

          <p className="text-sm leading-7 text-slate-600">
            利用者は、本サービスを利用することにより、
            本規約に同意したものとみなされます。
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第1条（本サービスの目的）
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスは、AIを活用し、利用者の学習、
            目標整理、振り返り、情報整理その他の活動を
            支援することを目的としています。
          </p>

          <p className="leading-8 text-slate-700">
            本サービスは、利用者自身の判断や行動を補助するものであり、
            利用者に代わって最終的な判断を行うものではありません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第2条（利用登録）
          </h2>

          <p className="leading-8 text-slate-700">
            利用者は、当社が指定する方法によりアカウントを登録し、
            本サービスを利用することができます。
          </p>

          <p className="leading-8 text-slate-700">
            利用者は、登録する情報について、
            正確かつ最新の情報を提供するものとします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第3条（アカウント管理）
          </h2>

          <p className="leading-8 text-slate-700">
            利用者は、自身のメールアドレス、パスワードその他の
            認証情報を適切に管理する責任を負います。
          </p>

          <p className="leading-8 text-slate-700">
            利用者は、アカウントを第三者に譲渡、貸与、
            共有その他これに類する行為をしてはなりません。
          </p>

          <p className="leading-8 text-slate-700">
            認証情報の管理不十分または第三者による不正利用によって
            生じた損害について、当社に故意または重大な過失がある場合を除き、
            当社は責任を負わないものとします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第4条（AIによる回答について）
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスでは、生成AIを利用して回答を生成します。
            AIによる回答には、誤り、不正確な情報、
            古い情報その他不完全な内容が含まれる場合があります。
          </p>

          <p className="leading-8 text-slate-700">
            利用者は、AIによる回答のみを根拠として重要な判断を行わず、
            必要に応じて信頼できる情報源または専門家に確認するものとします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第5条（専門的な助言について）
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスは、医師、心理職、弁護士、税理士、
            ファイナンシャルプランナーその他の資格を有する専門家による
            診断、治療、法律相談、税務相談、投資助言その他の
            専門的サービスを提供するものではありません。
          </p>

          <p className="leading-8 text-slate-700">
            医療、法律、金融その他専門的判断を必要とする事項については、
            適切な専門機関または専門家へ相談してください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第6条（緊急時の利用について）
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスは、緊急通報、救急対応、危機介入その他の
            緊急対応を目的としたサービスではありません。
          </p>

          <p className="leading-8 text-slate-700">
            利用者または第三者の生命や身体に差し迫った危険がある場合は、
            本サービスの回答を待たず、警察、消防、医療機関その他の
            適切な緊急窓口へ連絡してください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第7条（禁止事項）
          </h2>

          <p className="leading-8 text-slate-700">
            利用者は、本サービスの利用にあたり、
            以下の行為を行ってはなりません。
          </p>

          <ul className="list-disc space-y-2 pl-6 leading-8 text-slate-700">
            <li>法令または公序良俗に反する行為</li>
            <li>犯罪行為に関連する行為</li>
            <li>第三者の権利または利益を侵害する行為</li>
            <li>
              他人になりすます行為または虚偽の情報を用いて利用する行為
            </li>
            <li>
              本サービスまたはそのシステムへ不正にアクセスする行為
            </li>
            <li>
              本サービスに過度な負荷を与える行為
            </li>
            <li>
              自動化された手段等により大量のリクエストを送信する行為
            </li>
            <li>
              本サービスの運営を妨害する行為
            </li>
            <li>
              本サービスの脆弱性を不正に探索、悪用する行為
            </li>
            <li>
              その他、当社が不適切と合理的に判断する行為
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第8条（利用制限およびアカウント停止）
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、利用者が本規約に違反した場合、
            不正利用が確認された場合、
            または本サービスの安全な運営に必要と判断した場合、
            事前の通知なく利用制限またはアカウント停止を行うことがあります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第9条（知的財産権）
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスに関するプログラム、デザイン、
            ロゴ、文章その他のコンテンツに関する知的財産権は、
            当社または正当な権利を有する第三者に帰属します。
          </p>

          <p className="leading-8 text-slate-700">
            利用者は、法令上認められる場合を除き、
            当社の許可なくこれらを複製、転載、
            改変、配布その他の方法で利用してはなりません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第10条（サービス内容の変更等）
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、本サービスの改善、保守、
            技術上または事業上の理由その他必要に応じて、
            本サービスの全部または一部を変更、
            追加または終了することがあります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第11条（サービスの停止）
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、システム保守、障害、
            外部サービスの停止、災害その他やむを得ない事情により、
            本サービスの全部または一部を一時的に停止する場合があります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第12条（β版について）
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスがβ版、試験版その他開発段階の状態で提供される場合、
            機能、仕様、表示内容、保存方法等が予告なく変更されることがあります。
          </p>

          <p className="leading-8 text-slate-700">
            また、β版では一部の機能が正常に動作しない場合があります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第13条（保証の否認）
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、本サービスについて、
            正確性、完全性、有用性、特定目的への適合性、
            継続性または不具合が発生しないことを保証するものではありません。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第14条（免責）
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、本サービスの利用または利用不能により
            利用者に生じた損害について、
            当社に故意または重大な過失がある場合を除き、
            法令上許される範囲で責任を負わないものとします。
          </p>

          <p className="leading-8 text-slate-700">
            ただし、本規約の規定が消費者契約法その他の法令により
            無効となる場合は、その法令の定めに従います。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第15条（プライバシー）
          </h2>

          <p className="leading-8 text-slate-700">
            利用者情報の取り扱いについては、
            当社が別途定めるプライバシーポリシーに従うものとします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第16条（本規約の変更）
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、法令の変更、本サービスの変更その他必要に応じて、
            本規約を変更することがあります。
          </p>

          <p className="leading-8 text-slate-700">
            重要な変更を行う場合には、
            本サービス上その他適切な方法によりお知らせします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第17条（準拠法および管轄）
          </h2>

          <p className="leading-8 text-slate-700">
            本規約は日本法を準拠法とします。
          </p>

          <p className="leading-8 text-slate-700">
            本サービスに関して紛争が生じた場合は、
            法令に別段の定めがある場合を除き、
            当社所在地を管轄する裁判所を
            第一審の合意管轄裁判所とします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            第18条（お問い合わせ）
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスまたは本規約に関するお問い合わせは、
            当社が別途指定するお問い合わせ窓口までお願いいたします。
          </p>
        </section>

        <footer className="border-t border-slate-200 pt-6 text-sm leading-7 text-slate-500">
          <p>制定日：2026年9月2日</p>
          <p>合同会社Webuild</p>
        </footer>
      </div>
    </main>
  );
}
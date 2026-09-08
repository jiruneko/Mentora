export const metadata = {
  title: "プライバシーポリシー | Mentora",
  description:
    "Mentoraにおける個人情報および利用情報の取り扱いについて定めたプライバシーポリシーです。",
};

export default function PrivacyPolicyPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-16">
      <div className="space-y-10">
        <header className="space-y-4">
          <p className="text-sm font-medium text-slate-500">
            Mentora
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            プライバシーポリシー
          </h1>

          <p className="text-sm leading-7 text-slate-600">
            合同会社Webuild（以下「当社」といいます。）は、
            Mentora（以下「本サービス」といいます。）における
            利用者の情報について、以下のとおり取り扱います。
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            1. 取得する情報
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、本サービスの提供にあたり、以下の情報を取得する場合があります。
          </p>

          <ul className="list-disc space-y-2 pl-6 leading-8 text-slate-700">
            <li>
              氏名または表示名、メールアドレスなどのアカウント情報
            </li>
            <li>
              利用者が本サービスに入力した質問、相談内容、会話内容その他の入力情報
            </li>
            <li>
              本サービスの利用日時、アクセス状況その他の利用情報
            </li>
            <li>
              不具合調査やセキュリティ確保のために必要となる技術情報
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            2. 利用目的
          </h2>

          <p className="leading-8 text-slate-700">
            取得した情報は、以下の目的で利用します。
          </p>

          <ul className="list-disc space-y-2 pl-6 leading-8 text-slate-700">
            <li>本サービスの提供、本人確認および認証のため</li>
            <li>AIによる回答および学習支援機能を提供するため</li>
            <li>本サービスの品質向上、不具合調査および改善のため</li>
            <li>
              不正利用、迷惑行為その他本サービスの安全な運営を妨げる行為への対応のため
            </li>
            <li>
              本サービスに関する重要なお知らせや問い合わせ対応のため
            </li>
            <li>
              法令または行政機関等からの適法な要請に対応するため
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            3. AIサービスへの情報送信
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスでは、AIによる回答を生成するため、
            利用者が入力した情報の全部または一部を、
            外部のAIサービス提供事業者に送信する場合があります。
          </p>

          <p className="leading-8 text-slate-700">
            現在、本サービスではOpenAIのAPIを利用しています。
            利用者は、氏名、住所、電話番号、金融情報、パスワード、
            医療上の機微な情報その他、第三者に知られたくない情報については、
            必要以上に入力しないようお願いいたします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            4. 会話情報の保存
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスでは、機能改善または継続的な会話機能の提供等のために、
            会話情報を保存する場合があります。
          </p>

          <p className="leading-8 text-slate-700">
            なお、β版その他開発段階の機能については、
            会話情報を永続的に保存しない場合があります。
            保存方法または保存期間に変更がある場合は、
            必要に応じて本ポリシーを更新します。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            5. 第三者提供
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、次の場合を除き、利用者の個人情報を第三者に提供しません。
          </p>

          <ul className="list-disc space-y-2 pl-6 leading-8 text-slate-700">
            <li>利用者本人の同意がある場合</li>
            <li>
              本サービスの提供に必要な範囲で業務委託先に取り扱いを委託する場合
            </li>
            <li>法令に基づく場合</li>
            <li>
              人の生命、身体または財産の保護のために必要であり、
              本人の同意を得ることが困難である場合
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            6. 安全管理
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、取得した情報への不正アクセス、漏えい、滅失、
            改ざんその他の事故を防止するため、
            合理的な範囲で必要な安全管理措置を講じます。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            7. アカウントおよび情報の削除
          </h2>

          <p className="leading-8 text-slate-700">
            利用者は、当社所定の方法により、
            自身のアカウントまたは当社が保有する利用者情報について、
            削除その他の対応を求めることができます。
          </p>

          <p className="leading-8 text-slate-700">
            ただし、法令上保存が必要な情報、
            不正利用防止または紛争対応等のため保存する合理的な必要がある情報については、
            一定期間保存する場合があります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            8. Cookie等の利用
          </h2>

          <p className="leading-8 text-slate-700">
            本サービスでは、ログイン状態の維持、
            セキュリティ確保その他本サービスの正常な提供のため、
            Cookieその他これに類する技術を利用する場合があります。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            9. 未成年者による利用
          </h2>

          <p className="leading-8 text-slate-700">
            未成年者が本サービスを利用する場合は、
            必要に応じて保護者その他の法定代理人の同意を得たうえで
            利用してください。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            10. 本ポリシーの変更
          </h2>

          <p className="leading-8 text-slate-700">
            当社は、法令の変更、本サービスの内容変更その他必要に応じて、
            本ポリシーを変更することがあります。
          </p>

          <p className="leading-8 text-slate-700">
            重要な変更がある場合には、
            本サービス上その他適切な方法によりお知らせします。
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-slate-900">
            11. お問い合わせ
          </h2>

          <p className="leading-8 text-slate-700">
            本ポリシーまたは利用者情報の取り扱いに関するお問い合わせは、
            当社が別途指定するお問い合わせ窓口までお願いいたします。
          </p>
        </section>

        <footer className="border-t border-slate-200 pt-6 text-sm leading-7 text-slate-500">
          <p>制定日：2026年9月2日</p>
          <p>合同会社Webuild</p>
          <div className="flex gap-4 text-sm text-slate-500">
        <a
            href="/privacy"
            className="hover:text-slate-900"
        >
            プライバシーポリシー
        </a>

        <a
            href="/terms"
            className="hover:text-slate-900"
        >
            利用規約
        </a>
        </div>
        </footer>
      </div>
    </main>
  );
}
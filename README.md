# Lucky Hospitals

A responsive hospital website built with Node.js. The build copies the deployable static site into `dist/` without third-party dependencies.

## Build locally

Requires Node.js 20 or newer.

```sh
npm run build
```

Open `dist/index.html` in a browser to preview the built site.

## GitHub Actions

The **Build Website (CI)** workflow checks out the source, sets up Node.js, builds the site, and uploads `dist/` as the `lucky-hospitals-site` artifact. It runs on pushes and pull requests targeting `main`.

The **Deploy Website (CD)** workflow runs after a successful CI workflow on `main` and syncs the artifact to `s3://luckyhospital2026/`. The AWS region must match the bucket's region. The bucket must already exist and be configured for website hosting if it should serve the site directly.

Before deployment, add these repository Actions secrets under **Settings → Secrets and variables → Actions**:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`

Use an IAM user or role limited to `s3:ListBucket` on `arn:aws:s3:::luckyhospital2026` and `s3:PutObject` / `s3:DeleteObject` on `arn:aws:s3:::luckyhospital2026/*`. The delete permission is needed because deployment uses `aws s3 sync --delete` to remove files that are no longer in the build. Do not put AWS credentials in the repository or send them in chat.

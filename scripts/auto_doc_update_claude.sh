#!/usr/bin/env bash

# PowerShell通知を表示する関数
show_notification() {
  local message="$1"
  local title="${2:-Claude}"
  powershell.exe -NoProfile -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('$message','$title')"
}

while true; do
  cat prompts/prompt.md | claude --dangerously-skip-permissions -p "prompt:"
  show_notification "Looping" "Claude"
  echo ""
  echo "選択してください:"
  echo "1) ループを抜けて、次の処理に進む"
  echo "2) ループを続ける"
  echo "3) スクリプトを終了する"
  read -r -p "選択 (1/2/3): " response
  
  case "$response" in
    1)
      echo "次の処理に進みます..."
      break
      ;;
    2)
      echo "ループを続けます..."
      continue
      ;;
    3)
      echo "スクリプトを終了します"
      exit 0
      ;;
    *)
      echo "無効な選択です。もう一度入力してください。"
      ;;
  esac
done

echo "ドキュメントを更新します..."
claude -p "update the documentation using docs-updater agent"
show_notification "ドキュメントが更新されました" "Claude"

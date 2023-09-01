# kk

- [ ] 使用添加 create-kk 命令，为其提供单独的指令文件
- [ ] 模板文件使用 git submodule 注入，在 template 文件夹内。
- [ ] 构建时，从 git 仓库拉取 submodule 代码，并将代码复制至 cmd/template 文件夹，脚手架从该文件夹复制并创建文件。

## git submodule

```bash
# 增加
git submodule add <submodule-url> <submodule_path>

# 删除
git submodule deinit <submodule_path> # 取消初始化
git rm --cached <submodule_path> # 移除缓存
# 然后commit并push

# 拉取所有submodule代码
git submodule update --init --recursive
```

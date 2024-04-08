package cmd

import (
	"github.com/ppoonk/AirGo/initialize"
	"github.com/spf13/cobra"
)

func init() {
	updateCmd.Flags().StringVar(&startConfigPath, "config", "config.yaml", "config.yaml directory to read from")
}

var updateCmd = &cobra.Command{
	Use:   "update",
	Short: "update AirGo",
	Run: func(cmd *cobra.Command, args []string) {
		// 开发时，通过命令行升级数据库 role_and_menu 、 menu 以及 casbin_rule。因为开发时，经常修改api接口和菜单。
		initialize.InitializeUpdate(startConfigPath)
	},
}

// 版本升级时，额外需要处理的数据，例如数据库字段值批量修改
func (s *System) ChangeDataForUpdate() error {
	return global.DB.Transaction(func(tx *gorm.DB) error {
		err := tx.Exec("UPDATE node SET protocol = 'hysteria2' WHERE protocol = 'hysteria' ").Error
		if err != nil {
			return err
		}
		err = tx.Exec("UPDATE node SET vless_flow = '' WHERE vless_flow = 'none' ").Error
		if err != nil {
			return err
		}
		err = tx.Exec("UPDATE node SET security = '' WHERE security = 'none' ").Error
		if err != nil {
			return err
		}
		return nil
	})
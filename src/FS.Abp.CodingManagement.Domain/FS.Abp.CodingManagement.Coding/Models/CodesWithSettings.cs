using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Volo.Abp.Settings;

namespace FS.Abp.CodingManagement.Coding.Models
{
    public class CodesWithSettings
    {
        private ISettingDefinitionManager _settingDefinitionManager;
        public CodesWithSettings(
            ISettingDefinitionManager settingDefinitionManager
            )
        {
            _settingDefinitionManager = settingDefinitionManager;
        }

        public Codes Codes { get; set; }
        public List<SettingValue> SettingValues { get; set; }
        public List<string> AvailableSettingsGroups
        {
            get
            {
                var result = new List<string>();
                if (Codes.Definition?.Config?.IncludeSettingsGroups != null)
                {
                    result.AddRange(result);
                }
                if (Codes.Config?.IncludeSettingsGroups != null)
                {
                    result = result.Union(Codes.Config.IncludeSettingsGroups).ToList();
                }
                if (Codes.Config?.ExcludeSettingsGroups != null)
                {
                    result = result.Except(Codes.Config.ExcludeSettingsGroups).ToList();
                }
                return result;
            }
        }
        public List<SettingDefinition> AvailableSettingsDefinitions
        {
            get
            {
                var result = new List<SettingDefinition>();
                this.AvailableSettingsGroups.ForEach(g =>
                {
                    result.AddRange(_settingDefinitionManager.GetAll().Where(d => d.Name.StartsWith(g)).ToList());
                });
                return result;
            }
        }

    }
}

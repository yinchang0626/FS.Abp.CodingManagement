using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using Volo.Abp;
using Volo.Abp.DependencyInjection;
using Volo.Abp.SettingManagement;
using Volo.Abp.Settings;

namespace FS.Abp.CodingManagement.Versions
{
    public class AsyncLocalCurrentVersionAccessor : ICurrentVersionAccessor, ISingletonDependency
    {
        private readonly ISettingManager _settingManager;
        public BasicVersionInfo Current
        {
            get
            {
                if (_currentScope.Value == null)
                {
                    _currentScope.Value = new BasicVersionInfo(null);
                    string version = Volo.Abp.Threading.AsyncHelper.RunSync(
                        () => _settingManager.GetOrNullForCurrentTenantAsync(CodingManagementSettingNames.Versions.CurrentVersion));
                    if (Guid.TryParse(version, out Guid versionGuid))
                    {
                        _currentScope.Value= new BasicVersionInfo(versionGuid);
                    }

                }
                return _currentScope.Value;
            }
            set
            {
                _currentScope.Value = value;
                Volo.Abp.Threading.AsyncHelper.RunSync(
                    () => _settingManager.SetForCurrentTenantAsync(CodingManagementSettingNames.Versions.CurrentVersion, value.VersionId?.ToString()));
            }
        }

        private AsyncLocal<BasicVersionInfo> _currentScope;

        public AsyncLocalCurrentVersionAccessor(ISettingManager settingManager)
        {
            _currentScope = new AsyncLocal<BasicVersionInfo>();
            _settingManager = settingManager;
        }
    }
    public class CurrentVersion : ICurrentVersion, ITransientDependency
    {
        public Guid? Id => _currentVersionAccessor.Current?.VersionId;

        public string Name => _currentVersionAccessor.Current?.Name;

        private readonly ICurrentVersionAccessor _currentVersionAccessor;

        public CurrentVersion(ICurrentVersionAccessor currentVersionAccessor)
        {
            _currentVersionAccessor = currentVersionAccessor;
        }
        public void Change(Guid? id, string name = null)
        {
            var oldValue = _currentVersionAccessor.Current;
            _currentVersionAccessor.Current = new BasicVersionInfo(id, name);

        }
    }
}

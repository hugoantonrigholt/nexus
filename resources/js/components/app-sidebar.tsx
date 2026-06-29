import { Link, usePage } from '@inertiajs/react';
import { BookOpen, ChevronDown, FolderGit2, LayoutGrid, Newspaper, PenSquare, Settings } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import AppLogo from '@/components/app-logo';
import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { TeamSwitcher } from '@/components/team-switcher';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import type { NavItem } from '@/types';

export function AppSidebar() {
    const page = usePage();
    const auth = page.props.auth as any;
    const sectors = page.props.sectors as any[];
    const dashboardUrl = page.props.currentTeam
        ? dashboard(page.props.currentTeam.slug)
        : '/';

    const mainNavItems: NavItem[] = [
        {
            title: 'Dashboard',
            href: dashboardUrl,
            icon: LayoutGrid,
        },
        {
            title: 'Feed',
            href: '/feed',
            icon: Newspaper,
        },
        {
            title: 'Write Article',
            href: '/posts/create',
            icon: PenSquare,
        },
        {
            title: 'Thesis Cards',
            href: '/thesis-cards',
            icon: BookOpen,
        },
        {
            title: 'Value Chains',
            href: '/value-chains',
            icon: BookOpen,
        },
    ];

    const adminNavItems: NavItem[] = auth.user?.role === 'admin' ? [
        {
            title: 'Admin Panel',
            href: '/admin',
            icon: Settings,
        },
    ] : [];

    const sectorNavItems: NavItem[] = (sectors || []).map((sector) => ({
        title: sector.name,
        href: `/sectors/${sector.slug}`,
        badge: sector.posts_count ?? 0,
    }));

    const footerNavItems: NavItem[] = [
        {
            title: 'Repository',
            href: 'https://github.com/laravel/react-starter-kit',
            icon: FolderGit2,
        },
        {
            title: 'Documentation',
            href: 'https://laravel.com/docs/starter-kits#react',
            icon: BookOpen,
        },
    ];

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboardUrl} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <TeamSwitcher />
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
                {sectorNavItems.length > 0 && (
                    <Collapsible defaultOpen className="group/collapsible">
                        <SidebarGroup>
                            <SidebarGroupLabel asChild>
                                <CollapsibleTrigger className="flex w-full items-center justify-between px-2">
                                    <span>Sectors</span>
                                    <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                                </CollapsibleTrigger>
                            </SidebarGroupLabel>
                            <CollapsibleContent>
                                <NavMain items={sectorNavItems} label="" />
                            </CollapsibleContent>
                        </SidebarGroup>
                    </Collapsible>
                )}
                {adminNavItems.length > 0 && (
                    <NavMain items={adminNavItems} label="Administration" />
                )}
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

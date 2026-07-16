import { BudgetProgress } from "./budget-progress";
import { DashboardSummary } from "./dashboard-summary";
import { ExpenseCategory } from "./expense-category";
import { MonthlyChart } from "./monthly-chart";
import { RecentTransaction } from "./recent-transaction";

export interface DashboardResponse {
    success: boolean;
    message: string;
    summary: DashboardSummary;
    recentTransactions: RecentTransaction[];
    monthlyChart: MonthlyChart[];
    expenseCategories: ExpenseCategory[];
    budget: BudgetProgress;
}

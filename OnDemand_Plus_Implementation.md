# ON-DEMAND PLUS: IMPLEMENTATION GUIDE
## From Behavioral Insight to Product Reality

---

## EXECUTIVE SUMMARY

**The Problem:** Users choose not to use Scheduled Orders because scheduling feels like losing control—even though technically they can modify orders.

**The Solution:** "On-Demand Plus" restructures the interaction so that:
1. Users always order **now** (preserves instant-order psychology)
2. Users choose **when** delivery arrives (preserves control feeling)
3. Users adjust **anytime** penalty-free (removes commitment anxiety)

**Expected Impact:** 3-5x adoption increase vs. current Scheduled Orders feature.

---

## PART 1: USER JOURNEY REDESIGN

### Before: Current Scheduled Orders Flow

```
Swiggy Home
  ↓
[Browse restaurants] or [Search for item]
  ↓
[Add to cart]
  ↓
[Proceed to checkout]
  ↓
[Select delivery time]
  ├─ Option A: "Deliver now" (ASAP)
  └─ Option B: "Schedule order" (select date/time from calendar)
  ↓
[Place order]
  ↓
User feels: "I committed to a time"
Psychology: Locked in, low flexibility signal
Adoption: ~20-30% of future orders
```

### After: On-Demand Plus Flow

```
Swiggy Home
  ↓
[Browse restaurants] or [Search for item]
  ↓
[Add to cart]
  ↓
[Proceed to checkout]
  ↓
[Select delivery window] ← CHANGED
  ├─ Default: "Deliver ASAP (within 30 mins)"
  └─ Slider: "Or within [30 mins / 1 hour / 2 hours / 3 hours]"
  ↓
[Optional: Extend delivery window]
  ├─ Trigger: Shows only if cart > $500 or 8+ items
  └─ Offer: "More time to collect final orders? Move delivery to [+1 hour]"
  ↓
[Place order] ← Feels like instant order
  ↓
[Post-order: Adjust delivery window anytime]
  ├─ Visual: Slider showing "Deliver between [12:30 - 1:00 PM]"
  └─ Action: Tap to shift window left/right in 15-min increments
  ↓
User feels: "I ordered now, I control when"
Psychology: Present-me decides, flexible, responsive
Adoption: Expected 60-70% of future orders
```

---

## PART 2: DETAILED UI/UX SPECIFICATIONS

### 2.1 Checkout Flow: Delivery Time Selection

**Current state (Scheduled Orders):**
```
[Delivery time selection]
  ├─ "Deliver now" (radio button)
  ├─ "Schedule order" (radio button + calendar picker)
  └─ [Schedule for later shows calendar widget]
```

**New state (On-Demand Plus):**
```
[WHEN DO YOU WANT IT?]

[Slider showing time ranges]
  ├─ [████░░░░░░░░░░░░░░] "Within 30 mins"
  ├─ [████████░░░░░░░░░░] "Within 1 hour"
  ├─ [██████████░░░░░░░░] "Within 2 hours" (default position)
  └─ [████████████░░░░░░] "Within 3 hours"

[Current time: 12:00 PM]
[Estimated delivery: 12:45 - 1:15 PM]

[Continue to payment]
```

**Design rationale:**
- Slider instead of calendar = feels less formal/committed
- Time *range* (45-min window) instead of *exact time* = feels flexible
- Visual shows what user is choosing (delivery window) not locking in (exact moment)
- Default: middle option (2 hours) = balances "soon enough" with "time to prepare"

---

### 2.2 Trigger: Large/Group Orders

**When to show the extended window suggestion:**

Conditions (show if ANY met):
- Cart total > ₹500
- Number of items > 8
- Multiple restaurants in order
- User has entered "event location" (detected by saved address)

**UI Placement:**
After cart summary, before "Continue to payment"

```
[Order summary: ₹1,200 | 10 items]

╔════════════════════════════════════╗
║ MORE TIME FOR PLANNING?             ║
║ "Looks like you're getting ready    ║
║ for something special. Want more    ║
║ time to collect final orders?"      ║
║                                    ║
║ [+ 30 mins] [+ 1 hour] [+ 2 hours] ║
╚════════════════════════════════════╝

[Original delivery: 12:45 - 1:15 PM]
```

**Copy approach:**
- ❌ "Schedule your order"
- ✓ "More time for planning?"
- ✓ Frames it as "I'm extending my buffer," not "committing to a time"

---

### 2.3 Post-Order: Delivery Window Adjustment

**Current state (Scheduled Orders):**
```
Order confirmed
  ├─ Scheduled for: 1:00 PM
  ├─ [Modify order] (navigates to edit screen)
  └─ [Cancel order] (with cancellation message)
```

**New state (On-Demand Plus):**
```
Order confirmed

┌─────────────────────────────────────┐
│ [Status: Preparing]                 │
│ Delivery window: 12:45 - 1:15 PM   │
│                                    │
│ [Adjust window:]                   │
│ ◀ [12:30 - 12:45] [12:45 - 1:15] [1:15 - 1:45] ▶
│                 ↑ current window    │
│                                    │
│ [Modify order] [Cancel]            │
└─────────────────────────────────────┘
```

**Interaction mechanics:**
- Default: Shows 3-window slider centered on user's chosen window
- Tap left/right arrow: Shifts entire window by 15 mins
- Free to adjust until **2 hours before earliest delivery time**
- After cutoff: Show "Need to adjust? [Call us]" (human support, not hard block)

**Copy:**
- ✓ "Adjust window" not "modify order"
- ✓ Shows windows, not a strict "delivery time"
- ✓ Visual is horizontal shift (feels flexible) not calendar picker (feels committed)

---

## PART 3: BEHAVIORAL MECHANICS

### 3.1 How "On-Demand Plus" Preserves Control

| Control Dimension | Old (Scheduled) | New (On-Demand Plus) |
|-------------------|-----------------|----------------------|
| **When I order** | Past-me decides | Present-me decides NOW |
| **What I get** | Locked to past choice | Present-me chooses window |
| **If I change mind** | Reversal feels bad | Adjustment feels natural |
| **Identity signal** | "I planned ahead" | "I ordered smartly" |
| **Psychological feel** | Commitment/lock-in | Flexibility/control |

### 3.2 Decision-Making Timeline

**Example: Office party on Friday, 1:00 PM**

```
MONDAY (2 days before):
  → User orders food
  → Selects: "Deliver within 2 hours"
  → Estimated: 12:45 - 1:15 PM Friday
  → Feels like: "I'm handling this" (not "I scheduled it")

TUESDAY - THURSDAY:
  → User can adjust window anytime
  → 20 people said yes → move delivery to +30 mins
  → One person is late → shift window by 15 mins
  → Feels like: "I'm in control, responding to changes"

FRIDAY 11:45 AM (2 hours before earliest delivery):
  → Cutoff for free adjustments
  → If user needs to change → "Call support, we'll help"
  → Last chance to feel in control

FRIDAY 1:00 PM:
  → Food arrives in user's chosen window
  → Same outcome as scheduling, but user felt like they ordered smartly
```

### 3.3 Why This Works Psychologically

**The shift in mental model:**

❌ **Old:** "I scheduled food → I committed → I'm locked in"
✓ **New:** "I ordered food → I choose when → I stay in control"

**Key psychological shift:**
- Old: "Am I honoring my past decision?"
- New: "Am I responding well to current conditions?"

The **framing changes the emotion**, even though the outcome (food at the right time) is the same.

---

## PART 4: MESSAGING & TONE

### 4.1 What To Say & What NOT To Say

**❌ AVOID (Triggers commitment anxiety):**
- "Schedule your order"
- "Book a time slot"
- "Pre-order for [date]"
- "Lock in your delivery"
- "Commit to a time"

**✓ USE (Preserves control feeling):**
- "Deliver when you want"
- "Choose your delivery window"
- "More time to prepare"
- "Flexible timing"
- "Adjust anytime"
- "Your delivery window"

### 4.2 Copy Examples

**Homepage/CTA:**
```
❌ "Pre-Book Your Meals"
✓ "Order Now, Deliver When You Want"

❌ "Schedule food for later"
✓ "Flexible delivery timing"
```

**Checkout:**
```
❌ "Schedule your order for Friday"
✓ "Deliver between Friday 12:45 - 1:15 PM"
```

**Post-order card:**
```
❌ "Your scheduled delivery is locked in"
✓ "Your delivery window: adjust anytime"
```

**Group order trigger:**
```
❌ "Pre-schedule larger orders"
✓ "Ordering for a group? Give yourself more time"
```

### 4.3 Messaging Strategy by Context

| Context | Functional Message | Emotional Message |
|---------|-------------------|------------------|
| **Before order** | "Food arrives at the right time" | "You've got this covered" |
| **During checkout** | "Choose when it arrives" | "Control the timing" |
| **Post-order** | "Delivery between X - Y" | "Adjust anytime" |
| **Pre-delivery** | "Food arriving soon" | "Everything's on track" |

---

## PART 5: FEATURE ROLLOUT STRATEGY

### 5.1 Phased Rollout

**Phase 1 (Week 1-2): Internal Testing**
- Employee testing (Swiggy team orders)
- Validate: Can users adjust windows smoothly?
- Validate: Does messaging feel clear?
- Target: Fix UI bugs, polish copy

**Phase 2 (Week 3-4): Cohort Testing**
- Beta with 5% of active users
- Only show for future-time orders (3+ hours away)
- Measure: Adoption, modification rate, cancellation rate
- Target: 30%+ adoption in beta (vs. 10% current)

**Phase 3 (Week 5-6): Segment Rollout**
- Tier 1 cities first (where adoption is lowest)
- Target: Office workers, event planners (high-value segments)
- Show on homepage for these segments only
- Measure: Adoption lift, repeat usage, user satisfaction

**Phase 4 (Week 7+): Full Rollout**
- All users, all cities
- Monitor: Adoption, support tickets, feedback
- Optimize: Based on usage patterns

### 5.2 A/B Test: On-Demand Plus vs. Current Scheduled Orders

**Test group A:** Current feature (status quo)
**Test group B:** On-Demand Plus (new interaction model)

**Metrics to track:**
1. **Adoption rate:** % of future orders using feature
2. **Modification rate:** % of orders adjusted post-booking
3. **Repeat rate:** % of users using feature 2+ times within 30 days
4. **Cancellation rate:** % of orders cancelled after booking
5. **Satisfaction:** NPS scores for both groups

**Success criteria:**
- Test B adoption: 3x Test A adoption
- Test B modification: 40%+ (shows users confident in adjusting)
- Test B repeat: 50%+ (habit formation)

---

## PART 6: ADDRESSING EDGE CASES

### 6.1 What If Restaurant Can't Honor the Window?

**Problem:** User selects delivery window, but restaurant prep time is shorter.

**Solution:**
```
[Estimated delivery: 12:45 - 1:15 PM]

⚠️  Restaurant note: "This order can be ready in 15 mins"
    Want a quicker delivery? [12:15 - 12:30 PM]
    
    Or keep your original window [12:45 - 1:15 PM]
```

**Psychology:**
- User sees options, user chooses
- Doesn't feel like system is forcing them
- Preserves sense of control

### 6.2 What If User Changes Mind 30 Minutes Before Delivery?

**Problem:** User tries to adjust window within 2-hour cutoff.

**Solution:**
```
[Status: Preparing for delivery]

⚠️  Less than 2 hours to delivery
    Can't adjust in system, but we can help!
    
    [📞 Call support]
    
    (Support can manually adjust if possible)
```

**Psychology:**
- System doesn't hard-block (feels punitive)
- Offers human help (feels supportive)
- Acknowledges: Sometimes plans change, that's okay

### 6.3 What If Multiple Items Have Different Prep Times?

**Problem:** Multi-restaurant order; different restaurants ready at different times.

**Solution:**
```
[Restaurant A ready at 12:30]
[Restaurant B ready at 12:50]

[Combined delivery window: 1:00 - 1:30 PM]
(Ensures all items arrive together)

[User can adjust to any window after both ready]
```

**Psychology:**
- Transparency about constraints
- User still feels in control of final window
- Explains why window is set where it is

---

## PART 7: SUCCESS METRICS & KPIs

### 7.1 Primary Metrics

**1. Feature Adoption Rate**
- Definition: % of orders with delivery time 3+ hours away using On-Demand Plus
- Current (Scheduled Orders): ~10-20%
- Target (On-Demand Plus): 50-70%
- Why it matters: Direct indicator if behavior change worked

**2. Modification Rate**
- Definition: % of booked orders where user adjusts delivery window post-booking
- Target: 30-50%
- Why it matters: High modification = user confident in adjusting (not anxious), feels in control

**3. Repeat Usage Rate**
- Definition: % of users who use On-Demand Plus 2+ times within 30 days
- Current (Scheduled Orders): ~15-25%
- Target (On-Demand Plus): 50-60%
- Why it matters: Habit formation = feature genuinely useful, not novelty

### 7.2 Secondary Metrics

**4. Cancellation Rate**
- Definition: % of On-Demand Plus orders cancelled before delivery
- Current (Scheduled Orders): 15-20%
- Target (On-Demand Plus): 8-12%
- Why it matters: Lower cancellation = less buyer's remorse, better user control feeling

**5. User Satisfaction (NPS)**
- Definition: NPS score for On-Demand Plus users
- Target: 50+
- Why it matters: Validates psychological benefit (feels good, not just works)

**6. Time-to-first-use**
- Definition: Days between user installing app and first On-Demand Plus order
- Target: <7 days (faster adoption = more intuitive)

### 7.3 Qualitative Feedback

**Survey questions (to validate behavior change):**
1. "Does On-Demand Plus feel flexible?" (should be high)
2. "Does it feel like you're in control?" (should be high)
3. "Do you feel locked in?" (should be low)
4. "Would you use this again?" (should be high)

---

## PART 8: COMPETITIVE ADVANTAGE

### Why This Matters for Swiggy

**Current landscape:**
- Uber Eats, Zomato: Have scheduling features, low adoption (users don't use them)
- Root cause: Scheduling feels restrictive, users avoid it

**Swiggy's opportunity:**
- First to solve the behavior problem (not just the feature problem)
- Reframe "scheduling" as "flexibility" instead of "commitment"
- Own the "on-demand control" positioning

**Messaging to market:**
```
"Order now, deliver when you want.
Not locked in. Always flexible.
The smarter way to plan meals."
```

---

## ROLLOUT CHECKLIST

- [ ] **Research phase:** Validate psychological insight with 20-30 user interviews
- [ ] **Design phase:** Finalize UI/UX specs, messaging, copy
- [ ] **Engineering phase:** Build slider component, window adjustment logic, support backend
- [ ] **Testing phase:** Internal QA, edge case handling
- [ ] **Beta phase:** 5% user rollout, monitor metrics daily
- [ ] **Segment phase:** Tier 1 cities, high-value segments
- [ ] **Full rollout:** All users, all cities
- [ ] **Optimization:** Based on feedback, iterate messaging/UI

---

## CONCLUSION

**The insight:** Adoption fails not because the feature doesn't work, but because using it *feels* like losing control.

**The solution:** "On-Demand Plus" preserves the psychological feel of instant ordering (decide now, stay in control) while delivering scheduling benefits (food at the right time).

**The outcome:** 3-5x adoption increase, deeper user engagement, stronger competitive positioning.

**The proof:** Users will modify orders (showing confidence), use repeatedly (forming habit), and report satisfaction (feeling good about it).

This is a behavior change, not just a feature change. And behavior changes are what drive real adoption.


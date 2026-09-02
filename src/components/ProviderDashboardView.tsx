                  : 'You will receive service requests after approval.'}
              </p>
            </div>
          </div>
        )}
      </section>

      {/* =========================================================
          TODAY'S OVERVIEW
      ========================================================= */}
      <section className="px-4 pt-5">
        <div className="mb-2.5 flex items-end justify-between">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-600">
              {language === 'hi'
                ? 'आज'
                : 'TODAY'}
            </p>

            <h3 className="mt-0.5 text-base font-black text-slate-900">
              {language === 'hi'
                ? 'आपका काम'
                : "Today's Overview"}
            </h3>
          </div>

          <button
            type="button"
            onClick={() => openRequests('all')}
            className="text-[11px] font-black text-pink-700"
          >
            {language === 'hi'
              ? 'सभी देखें →'
              : 'View all →'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => openRequests('pending')}
            className="rounded-2xl border border-pink-100 bg-pink-50 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-pink-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-pink-600 text-white">
              <FileText className="h-4 w-4" />
            </div>

            <p className="mt-2.5 text-[10px] font-bold text-slate-600">
              {language === 'hi'
                ? 'नई रिक्वेस्ट'
                : 'New Requests'}
            </p>

            <p className="mt-0.5 text-2xl font-black text-slate-900">
              {pendingRequests.length}
            </p>
          </button>

          <button
            type="button"
            onClick={() => openRequests('active')}
            className="rounded-2xl border border-blue-100 bg-blue-50 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-blue-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white">
              <Briefcase className="h-4 w-4" />
            </div>

            <p className="mt-2.5 text-[10px] font-bold text-slate-600">
              {language === 'hi'
                ? 'सक्रिय काम'
                : 'Active Jobs'}
            </p>

            <p className="mt-0.5 text-2xl font-black text-slate-900">
              {activeJobs.length}
            </p>
          </button>

          <button
            type="button"
            onClick={() => openRequests('completed')}
            className="rounded-2xl border border-violet-100 bg-violet-50 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-violet-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600 text-white">
              <CheckCircle2 className="h-4 w-4" />
            </div>

            <p className="mt-2.5 text-[10px] font-bold text-slate-600">
              {language === 'hi'
                ? 'पूरे किए काम'
                : 'Completed Jobs'}
            </p>

            <p className="mt-0.5 text-2xl font-black text-slate-900">
              {completedJobs.length}
            </p>
          </button>

          <button
            type="button"
            onClick={goToEarnings}
            className="rounded-2xl border border-amber-100 bg-amber-50 p-3.5 text-left transition-all hover:-translate-y-0.5 hover:border-amber-300"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500 text-white">
              <Wallet className="h-4 w-4" />
            </div>

            <p className="mt-2.5 text-[10px] font-bold text-slate-600">
              {language === 'hi'
                ? 'पूरे काम की कमाई'
                : 'Completed Earnings'}
            </p>

            <p className="mt-0.5 flex items-center text-2xl font-black text-slate-900">
              <IndianRupee className="h-5 w-5" />
              {completedEarnings.toLocaleString(
                'en-IN'
              )}
            </p>
          </button>
        </div>
      </section>

      {/* =========================================================
          NEW SERVICE REQUEST
      ========================================================= */}
      {pendingRequests.length > 0 && (
        <section className="px-4 pt-5">
          <div className="overflow-hidden rounded-3xl border border-pink-200 bg-white shadow-sm">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#BE185D] to-[#DB2777] px-4 py-3 text-white">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/15">
                  <Zap className="h-4 w-4" />
                </span>

                <div>
                  <p className="text-xs font-black">
                    {language === 'hi'
                      ? 'नई सर्विस रिक्वेस्ट'
                      : 'New Service Request'}
                  </p>

                  <p className="text-[9px] font-semibold text-pink-100">
                    {language === 'hi'
                      ? 'जल्दी प्रतिक्रिया दें'
                      : 'Respond quickly'}
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-white px-2 py-1 text-[10px] font-black text-pink-700">
                {pendingRequests.length}
              </span>
            </div>

            <div className="p-4">
              {pendingRequests
                .slice(0, 1)
                .map((request) => (
                  <div key={request.id}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-pink-50 px-2 py-1 text-[10px] font-black text-pink-800">
                          <Wrench className="h-3 w-3" />
                          {getLocalizedServiceName(
                            request
                          )}
                        </span>

                        <h4 className="mt-2 text-sm font-black text-slate-900">
                          {request.problemDescription}
                        </h4>
                      </div>

                      <div className="shrink-0 rounded-xl bg-amber-50 px-2.5 py-1.5 text-right">
                        <p className="text-[9px] font-bold text-amber-700">
                          {language === 'hi'
                            ? 'अनुमानित'
                            : 'Estimated'}
                        </p>

                        <p className="text-sm font-black text-slate-900">
                          ₹{request.estimatedPrice}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="flex min-w-0 items-center gap-1.5 rounded-xl bg-slate-50 p-2.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-pink-500" />

                        <span className="truncate text-[10px] font-bold text-slate-700">
                          {request.location}
                        </span>
                      </div>

                      <div className="flex min-w-0 items-center gap-1.5 rounded-xl bg-slate-50 p-2.5">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-blue-500" />

                        <span className="truncate text-[10px] font-bold text-slate-700">
                          {request.preferredDate}
                        </span>
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            request.id,
                            'accepted'
                          )
                        }
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-2xl bg-pink-600 py-3 text-xs font-black text-white shadow-sm transition-colors hover:bg-pink-700"
                      >
                        <CheckCircle2 className="h-4 w-4" />
                        {language === 'hi'
                          ? 'स्वीकार करें'
                          : 'Accept'}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          onUpdateStatus(
                            request.id,
                            'cancelled'
                          )
                        }
                        className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-xs font-black text-slate-600 transition-colors hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
                      >
                        <XCircle className="mx-auto h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          EARNINGS
      ========================================================= */}
      <section className="px-4 pt-5">
        <button
          type="button"
          onClick={goToEarnings}
          className="group relative w-full overflow-hidden rounded-3xl bg-gradient-to-br from-[#831843] to-[#DB2777] p-4 text-left text-white shadow-lg shadow-pink-900/10"
        >
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/5" />

          <div className="relative flex items-center justify-between">
            <div>
              <div className="flex items-center gap-1.5 text-pink-100">
                <CircleDollarSign className="h-4 w-4" />

                <span className="text-[10px] font-black uppercase tracking-wider">
                  {language === 'hi'
                    ? 'उपलब्ध कमाई'
                    : 'Recorded Earnings'}
                </span>
              </div>

              <p className="mt-1 text-3xl font-black tracking-tight">
                ₹
                {completedEarnings.toLocaleString(
                  'en-IN'
                )}
              </p>

              <p className="mt-1 text-[10px] font-semibold text-pink-100">
                {language === 'hi'
                  ? `${completedJobs.length} पूरे किए गए काम से`
                  : `From ${completedJobs.length} completed job${
                      completedJobs.length === 1
                        ? ''
                        : 's'
                    }`}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 transition-transform group-hover:translate-x-1">
              <ChevronRight className="h-5 w-5" />
            </div>
          </div>
        </button>
      </section>

      {/* =========================================================
          QUICK ACTIONS
      ========================================================= */}
      <section className="px-4 pt-5">
        <h3 className="mb-2.5 text-sm font-black text-slate-900">
          {language === 'hi'
            ? 'त्वरित कार्य'
            : 'Quick Actions'}
        </h3>

        <div className="grid grid-cols-4 gap-2">
          <button
            type="button"
            onClick={() =>
              openRequests('pending')
            }
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-pink-100 text-pink-700">
              <FileText className="h-5 w-5" />
            </span>

            <span className="mt-1.5 text-center text-[9px] font-black text-slate-700">
              {language === 'hi'
                ? 'रिक्वेस्ट'
                : 'Requests'}
            </span>
          </button>

          <button
            type="button"
            onClick={() =>
              openRequests('active')
            }
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Briefcase className="h-5 w-5" />
            </span>

            <span className="mt-1.5 text-center text-[9px] font-black text-slate-700">
              {language === 'hi'
                ? 'मेरे काम'
                : 'My Jobs'}
            </span>
          </button>

          <button
            type="button"
            onClick={goToEarnings}
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <IndianRupee className="h-5 w-5" />
            </span>

            <span className="mt-1.5 text-center text-[9px] font-black text-slate-700">
              {language === 'hi'
                ? 'कमाई'
                : 'Earnings'}
            </span>
          </button>

          <button
            type="button"
            onClick={onOpenProfileModal}
            className="flex flex-col items-center rounded-2xl border border-slate-100 bg-white p-2.5 shadow-sm transition-all hover:-translate-y-0.5"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-100 text-violet-700">
              <User className="h-5 w-5" />
            </span>

            <span className="mt-1.5 text-center text-[9px] font-black text-slate-700">
              {language === 'hi'
                ? 'प्रोफाइल'
                : 'Profile'}
            </span>
          </button>
        </div>
      </section>

      {/* =========================================================
          REQUESTS & ACTIVE JOBS
      ========================================================= */}
      <section
        id="partner-requests-section"
        className="px-4 pt-6"
      >
        <div className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-pink-600">
              {language === 'hi'
                ? 'वर्क मैनेजमेंट'
                : 'WORK MANAGEMENT'}
            </p>

            <h3 className="mt-0.5 text-base font-black text-slate-900">
              {language === 'hi'
                ? 'रिक्वेस्ट और काम'
                : 'Requests & Active Jobs'}
            </h3>
          </div>
        </div>

        <div className="mt-3 flex gap-1 overflow-x-auto rounded-2xl bg-slate-100 p-1">
          {(
            [
              [
                'all',
                language === 'hi'
                  ? 'सभी'
                  : 'All',
              ],
              [
                'pending',
                language === 'hi'
                  ? 'नई'
                  : 'New',
              ],
              [
                'active',
                language === 'hi'
                  ? 'चालू'
                  : 'Active',
              ],
              [
                'completed',
                language === 'hi'
                  ? 'पूर्ण'
                  : 'Completed',
              ],
            ] as const
          ).map(([filter, label]) => (
            <button
              key={filter}
              type="button"
              onClick={() =>
                setActiveRequestFilter(
                  filter
                )}
              className={`whitespace-nowrap rounded-xl px-3 py-1.5 text-[10px] font-black transition-all ${
                activeRequestFilter === filter
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-500'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="mt-3 space-y-3">
          {filteredRequests.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 bg-white px-5 py-8 text-center shadow-sm">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50">
                <Briefcase className="h-6 w-6 text-slate-300" />
              </div>

              <h4 className="mt-3 text-sm font-black text-slate-800">
                {activeRequestFilter ===
                'pending'
                  ? language === 'hi'
                    ? 'अभी कोई नई रिक्वेस्ट नहीं'
                    : 'No new requests right now'
                  : activeRequestFilter ===
                      'active'
                    ? language === 'hi'
                      ? 'कोई सक्रिय काम नहीं'
                      : 'No active jobs'
                    : activeRequestFilter ===
                        'completed'
                      ? language === 'hi'
                        ? 'अभी कोई पूरा काम नहीं'
                        : 'No completed jobs yet'
                      : language === 'hi'
                        ? 'अभी कोई सर्विस रिक्वेस्ट नहीं'
                        : 'No service requests yet'}
              </h4>

              <p className="mt-1 text-[11px] font-medium leading-relaxed text-slate-500">
                {language === 'hi'
                  ? 'नई ग्राहक रिक्वेस्ट आने पर वह यहाँ दिखाई देगी।'
                  : 'New customer requests will appear here when they are received.'}
              </p>
            </div>
          ) : (
            filteredRequests.map(
              (request) => {
                const isAccepted =
                  request.status ===
                    'accepted' ||
                  request.status ===
                    'on_the_way' ||
                  request.status ===
                    'service_started';

                const isCompleted =
                  request.status ===
                  'completed';

                const isCancelled =
                  request.status ===
                  'cancelled';

                return (
                  <article
                    key={request.id}
                    id={`request-card-${request.id}`}
                    className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm"
                  >
                    {/* Request header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <span className="inline-flex items-center gap-1 rounded-lg bg-pink-50 px-2 py-1 text-[10px] font-black text-pink-800">
                          <Wrench className="h-3 w-3" />

                          {getLocalizedServiceName(
                            request
                          )}
                        </span>

                        <h4 className="mt-2 text-sm font-black leading-snug text-slate-900">
                          {request.problemDescription}
                        </h4>
                      </div>

                      <div className="shrink-0 rounded-xl bg-pink-50 px-2.5 py-1.5 text-right">
                        <p className="text-[9px] font-bold text-pink-600">
                          {language === 'hi'
                            ? 'अनुमानित'
                            : 'Estimated'}
                        </p>

                        <p className="text-sm font-black text-slate-900">
                          ₹{request.estimatedPrice}
                        </p>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="mt-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[9px] font-black ${
                          request.status ===
                          'completed'
                            ? 'bg-emerald-100 text-emerald-800'
                            : request.status ===
                                'cancelled'
                              ? 'bg-rose-100 text-rose-700'
                              : request.status ===
                                    'requested' ||
                                  request.status ===
                                    'provider_found'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                        }`}
                      >
                        {getStatusLabel(
                          request.status
                        )}
                      </span>
                    </div>

                    {/* Location + time */}
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <div className="flex min-w-0 items-center gap-1.5 rounded-2xl bg-slate-50 p-2.5">
                        <MapPin className="h-3.5 w-3.5 shrink-0 text-pink-500" />


                          {language === 'hi'
                            ? 'रास्ते में निकलें'
                            : 'Mark On The Way'}
                        </button>
                      ) : request.status ===
                        'on_the_way' ? (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStatus(
                              request.id,
                              'service_started'
                            )
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 text-xs font-black text-white hover:bg-blue-700"
                        >
                          <Zap className="h-4 w-4" />

                          {language === 'hi'
                            ? 'काम शुरू करें'
                            : 'Start Service'}
                        </button>
                      ) : request.status ===
                        'service_started' ? (
                        <button
                          type="button"
                          onClick={() =>
                            onUpdateStatus(
                              request.id,
                              'completed'
                            )
                          }
                          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-3 text-xs font-black text-white hover:bg-emerald-700"
                        >
                          <CheckCircle2 className="h-4 w-4" />

                          {language === 'hi'
                            ? `काम पूरा करें • ₹${request.estimatedPrice}`
                            : `Complete Job • ₹${request.estimatedPrice}`}
                        </button>
                      ) : isCompleted ? (
                        <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-emerald-200 bg-emerald-50 py-2.5 text-xs font-black text-emerald-800">
                          <CheckCircle2 className="h-4 w-4 text-emerald-600" />

                          {language === 'hi'
                            ? `काम पूरा • ₹${request.estimatedPrice}`
                            : `Completed • ₹${request.estimatedPrice}`}
                        </div>
                      ) : isCancelled ? (
                        <div className="flex w-full items-center justify-center gap-1.5 rounded-2xl border border-rose-200 bg-rose-50 py-2.5 text-xs font-black text-rose-700">
                          <XCircle className="h-4 w-4 text-rose-500" />

                          {language === 'hi'
                            ? 'जॉब रद्द'
                            : 'Cancelled'}
                        </div>
                      ) : null}
                    </div>
                  </article>
                );
              }
            )
          )}
        </div>
      </section>

      {/* =========================================================
          RATINGS
      ========================================================= */}
      <section className="px-4 pt-6">
        <div className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">
                {language === 'hi'
                  ? 'ग्राहक अनुभव'
                  : 'CUSTOMER EXPERIENCE'}
              </p>

              <h3 className="mt-0.5 text-sm font-black text-slate-900">
                {language === 'hi'
                  ? 'आपकी रेटिंग'
                  : 'Your Rating'}
              </h3>
            </div>

            <button
              type="button"
              onClick={onOpenProfileModal}
              className="text-[10px] font-black text-pink-700"
            >
              {language === 'hi'
                ? 'प्रोफाइल देखें →'
                : 'View Profile →'}
            </button>
          </div>

          <div className="mt-3 flex items-center gap-4 rounded-2xl bg-amber-50 p-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-sm">
              <Star className="h-6 w-6 fill-amber-400 text-amber-400" />
            </div>

            <div>
              <p className="text-xl font-black text-slate-900">
                {rating > 0
                  ? rating.toFixed(1)
                  : '—'}
              </p>

              <p className="text-[10px] font-semibold text-slate-500">
                {reviewCount > 0
                  ? `${reviewCount} ${
                      language === 'hi'
                        ? 'ग्राहक रिव्यू'
                        : 'customer reviews'
                    }`
                  : language === 'hi'
                    ? 'अभी कोई रिव्यू नहीं'
                    : 'No reviews yet'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SUPPORT
      ========================================================= */}
      <section className="px-4 pt-5">
        <button
          type="button"
          onClick={onOpenHelpSupport}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition-colors hover:border-pink-200 hover:bg-pink-50/50"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Phone className="h-4 w-4" />
            </div>

            <div>
              <p className="text-xs font-black text-slate-900">
                {language === 'hi'
                  ? 'पार्टनर सहायता'
                  : 'Partner Support'}
              </p>

              <p className="mt-0.5 text-[10px] font-medium text-slate-500">
                {language === 'hi'
                  ? 'किसी भी समस्या में मदद लें'
                  : 'Get help whenever you need it'}
              </p>
            </div>
          </div>

          <ChevronRight className="h-4 w-4 text-slate-400" />
        </button>
      </section>

      <div className="h-4" />

      {/* =========================================================
          CHAT MODAL
      ========================================================= */}
      {chatRequest && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-950/45 p-0 sm:items-center sm:p-4">
          <div className="w-full max-w-md overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
            <div className="flex items-center justify-between bg-gradient-to-r from-[#831843] to-[#DB2777] px-4 py-4 text-white">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <MessageCircle className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="text-sm font-black">
                    {language === 'hi'
                      ? 'ग्राहक से चैट'
                      : 'Chat with Customer'}
                  </p>

                  <p className="truncate text-[10px] font-semibold text-pink-100">
                    {chatRequest.customerName}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={closeChat}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 text-white"
                aria-label="Close chat"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-[220px] bg-slate-50 p-4">
              <div className="rounded-2xl border border-pink-100 bg-white p-3 shadow-sm">
                <p className="text-[10px] font-bold text-pink-600">
                  {language === 'hi'
                    ? 'सर्विस रिक्वेस्ट'
                    : 'Service Request'}
                </p>

                <p className="mt-1 text-xs font-black text-slate-800">
                  {getLocalizedServiceName(
                    chatRequest
                  )}
                </p>

                <p className="mt-1 text-[10px] text-slate-500">
                  {language === 'hi'
                    ? 'यहाँ customer-provider chat को बाद में real-time backend से connect किया जा सकता है।'
                    : 'Real-time customer-provider chat can be connected here with shared backend storage.'}
                </p>
              </div>
            </div>

            <div className="border-t border-slate-100 bg-white p-3">
              <div className="flex items-center gap-2">

      )}
    </div>
  );
};

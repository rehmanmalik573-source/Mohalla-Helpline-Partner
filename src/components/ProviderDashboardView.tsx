अनुभव'
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
              className="text-[10px] font-black text-emerald-700"
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
                {rating > 0 ? rating.toFixed(1) : '—'}
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
          HELP / SUPPORT
      ========================================================= */}
      <section className="px-4 pt-5">
        <button
          type="button"
          onClick={onOpenHelpSupport}
          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white p-3.5 text-left shadow-sm transition-colors hover:border-emerald-200 hover:bg-emerald-50/50"
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

      {/* Bottom breathing space */}
      <div className="h-4" />
    </div>
  );
};
